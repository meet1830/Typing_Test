import React, { useState } from "react";
import { Box, Button, TextField } from "@material-ui/core";
import { auth } from "../firebaseConfig";
import errorMapping from "../Utils/errorMessages";
import { useAlert } from "../Context/AlertContext";
import { useTheme } from "../Context/ThemeContext";

const SignupForm = ({ handleClose }) => {
  // can also use refs instead of state to implement form functionality
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { setAlert } = useAlert();

  const { theme } = useTheme();

  const handleSubmit = () => {
    if (!email || !password || !confirmPassword) {
      // alert("Enter all details");
      setAlert({
        open: true,
        type: "warning",
        message: "Please enter all details",
      });
      return;
    }

    if (password != confirmPassword) {
      // alert("Password mismatch");
      setAlert({
        open: true,
        type: "warning",
        message: "Password Mismatch",
      });
      return;
    }

    // console.log(email, password, confirmPassword);

    // function provided from firebase to create user
    // function returns a promise
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((ok) => {
        // alert('User created');
        setAlert({
          open: true,
          type: "success",
          message: "Account created",
        });

        // we want to close the modal once user is created, hence brought handleclose function from accounticon as prop
        handleClose();
      })
      .catch((err) => {
        // alert("not able to create account");
        // here if user is already created and again tries to signup then will go here
        // or password is very weak -> less than 6 characters
        // for all such cases firebase console logs the error object

        // alert(errorMapping[err.code] || "Some error occured");
        // if error is not defined in mapping then show second message

        // using alert component defined to show errors
        setAlert({
          open: true,
          type: "error",
          message: errorMapping[err.code] || "Some error occured",
        });
      });
  };

  return (
    <div>
      <Box
        p={3}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          backgroundColor: "transparent",
          padding: 10,
        }}
      >
        <TextField
          variant="outlined"
          type="email"
          label="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          InputLabelProps={{
            style: {
              color: theme.title,
            },
          }}
          inputProps={{
            style: {
              color: theme.title,
            },
          }}
        >
          Email
        </TextField>
        <TextField
          variant="outlined"
          type="password"
          label="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{
            style: {
              color: theme.title,
            },
          }}
          inputProps={{
            style: {
              color: theme.title,
            },
          }}
        >
          Password
        </TextField>
        <TextField
          variant="outlined"
          type="password"
          label="Confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputLabelProps={{
            style: {
              color: theme.title,
            },
          }}
          inputProps={{
            style: {
              color: theme.title,
            },
          }}
        >
          Confirm Password
        </TextField>
        <Button
          variant="contained"
          size="large"
          style={{ backgroundColor: theme.title, color: theme.backgroundColor }}
          onClick={handleSubmit}
        >
          Signup
        </Button>
      </Box>
    </div>
  );
};

export default SignupForm;
