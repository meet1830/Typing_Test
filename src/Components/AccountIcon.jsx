import React, { useState } from "react";
import { AppBar, Modal, Tab, Tabs } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
// if log in is success then user should be redirect to user page by clicking the accoutn icon and the log out icon should also appear besides it
// to use this dependency firebase auth hooks will be used
// it returns an object if the user is logged in or not
// alternatively, can use auth.currentUser here, if it is not null or undefined then the user is logged in

const useStyles = makeStyles(() => ({
  modal : {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box : {
    width: '400'
  }
}))

const AccountIcon = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = useState(0);

  const handleValueChange = (e, v) => {
    // e will be the event and v will be the value which we can see
    setValue(v);
  };

  const classes = useStyles();

  const [user] = useAuthState(auth);
  // user will have a value if logged in or will be undefined or null
  // the user object will have a lot of information like users metadata, email, which theme, if user has any profile picture
  // console.log(user);

  const logout = () => {
    auth.signOut()
    .then((ok) => {
      alert("Logged out");
    })
    .catch((err) => {
      alert('Not able to log out');
    })
  }

  // if user is logged in then clicking on the account icon will navigate to user page but if not logged in then modal will open
  const navigate = useNavigate();
  const handleAccountIconClick = () => {
    if (user) {
      navigate('/user');
    } else {
      setOpen(true);
    }
  }

  return (
    <div>
        <AccountCircleIcon onClick={handleAccountIconClick} />

        { (user) && <LogoutIcon onClick={logout} style={{marginLeft: '5px'}} /> }

        <Modal open={open} onClose={handleClose} className={classes.modal} >
          <div className={classes.box}>
            <AppBar position="static" style={{ backgroundColor: 'transparent' }} >
              <Tabs value={value} onChange={handleValueChange} variant="fullWidth" >
                <Tab label="login" style={{color: 'white'}} ></Tab>
                <Tab label="signup" style={{color: 'white'}} ></Tab>
              </Tabs>
            </AppBar>

            {value === 0 && <LoginForm handleClose={handleClose} /> }
            {value === 1 && <SignupForm handleClose={handleClose} /> }
          </div>
        </Modal>
    </div>
  )
}

export default AccountIcon