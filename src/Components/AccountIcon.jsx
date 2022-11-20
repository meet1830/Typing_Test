import React, { useState } from "react";
import { AppBar, Modal, Tab, Tabs } from "@mui/material";
import { Box, makeStyles } from "@material-ui/core";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { useAlert } from "../Context/AlertContext";

import GoogleButton from "react-google-button";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useTheme } from "../Context/ThemeContext";

const useStyles = makeStyles(() => ({
  modal : {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(1.5px)', // apply blur background behind modal when it opens
  },
  box : {
    width: '400',
    textAlign: 'center',
    border: '1px solid'
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

  const {setAlert} = useAlert();

  const logout = () => {
    auth.signOut()
    .then((ok) => {
      // alert("Logged out");
      setAlert({
        open: true,
        type: 'success',
        message: 'Logged Out'
      });
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

  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    // so we click on sign in with google a pop up should open
    // firebase gives that pop up hence import that and also google auth provider that handles authentication
    // google provider is a class hence create a new object from that
    signInWithPopup(auth, googleProvider)
    .then((ok) => {
      setAlert({
        open: true,
        type: 'success',
        message: 'Logged In'
      })

      // close modal
      handleClose();
    })
    .catch((err) => {
      setAlert({
        open: true,
        type: 'error',
        message: 'Google Authentication failed'
      })
    })
  }

  const {theme} = useTheme();

  return (
    <div>
        <AccountCircleIcon onClick={handleAccountIconClick} />

        { (user) && <LogoutIcon onClick={logout} style={{marginLeft: '5px'}} /> }

        <Modal open={open} onClose={handleClose} className={classes.modal} >
          <div className={classes.box}>
            <AppBar position="static" style={{ backgroundColor: 'transparent' }} >
              <Tabs value={value} onChange={handleValueChange} variant="fullWidth" >
                <Tab label="login" style={{color: theme.title}} ></Tab>
                <Tab label="signup" style={{color: theme.title}} ></Tab>
              </Tabs>
            </AppBar>

            {value === 0 && <LoginForm handleClose={handleClose} /> }
            {value === 1 && <SignupForm handleClose={handleClose} /> }

            <Box >
              <span style={{display: 'block', padding: '1rem'}} >OR</span>
              <GoogleButton 
                style={{
                  width: "100%"
                }}
                onClick={signInWithGoogle}
              />
            </Box>

          </div>
        </Modal>
    </div>
  )
}

export default AccountIcon