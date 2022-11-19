import React, { useState } from "react";
import { AppBar, Modal, Tab, Tabs } from "@mui/material";
import { makeStyles } from "@material-ui/core";
// search icons mui icons website
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// styling mui components
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

  return (
    <div>
        <AccountCircleIcon onClick={() => setOpen(true)} />

        {/* Modal for login and signup when click account icon */}
        <Modal open={open} onClose={handleClose} className={classes.modal} >
          <div className={classes.box}>
            {/* the login and signup tabs are called appbar in mui, and in that two tabs one for login and other signup */}
            <AppBar position="static" >
              <Tabs value={value} onChange={handleValueChange} variant="fullWidth" >
                {/* value means first tab will have value 0 next of value 1 and so on. so when click on different tabs the value will change. so based on diff values different components can be rendered */}
                <Tab label="login"></Tab>
                <Tab label="signup"></Tab>
              </Tabs>
            </AppBar>

            {value === 0 && <h1>login component</h1>}
            {value === 1 && <h1>signup component</h1>}
          </div>
        </Modal>
    </div>
  )
}

export default AccountIcon