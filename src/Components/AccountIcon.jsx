import React, { useState } from "react";
import { AppBar, Modal, Tab, Tabs } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
        <Modal open={open} onClose={handleClose} className={classes.modal} >
          <div className={classes.box}>
            <AppBar position="static" >
              <Tabs value={value} onChange={handleValueChange} variant="fullWidth" >
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