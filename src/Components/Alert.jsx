// using the alert component of mui for error handling
// creating a context for handling all the states like opening and closing and the type of alert to show anywhere in the project
// snackbar code from mui snackbar website
// now placing alert at the top of the application in app.js
import { Slide, Snackbar, Alert } from "@mui/material";
import React from "react";
import { useAlert } from "../Context/AlertContext";

const AlertSnackbar = () => {
  const { alert, setAlert } = useAlert();

  const handleClose = (event, reason) => {
    if (reason === "clickAway") {
      return;
    }
    setAlert({
      open: false,
      message: "",
      type: "",
    });
  };

  return (
    <div>
      <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }} >
        <Slide in={alert.open}>
          <Alert severity={alert.type} onClose={handleClose} >{alert.message}</Alert>
        </Slide>
      </Snackbar>
    </div>
  );
};

export default AlertSnackbar;
