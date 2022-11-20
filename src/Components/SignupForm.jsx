import React, { useState } from "react";
import { Box, Button, TextField } from "@material-ui/core";
import {auth} from "../firebaseConfig";

const SignupForm = ({handleClose}) => {
  // can also use refs instead of state to implement form functionality
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    if (!email || !password || !confirmPassword) {
      alert("Enter all details");
      return;
    }

    if (password != confirmPassword) {
      alert("Password mismatch");
      return;
    }

    // console.log(email, password, confirmPassword);

    // function provided from firebase to create user
    // function returns a promise
    auth.createUserWithEmailAndPassword(email, password)
    .then((ok) => {
      alert('User created');

      // we want to close the modal once user is created, hence brought handleclose function from accounticon as prop
      handleClose();
    })
    .catch((err) => {
      alert("not able to create account");
      // here if user is already created and again tries to signup then will go here
      // or password is very weak -> less than 6 characters
      // for all such cases firebase console logs the error object
    })
    
  };

  return (
    <div>
      <Box
        p={3}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          backgroundColor: "white",
          padding: 10,
        }}
      >
        <TextField variant="outlined" type="email" label="Enter Email" onChange={(e) => setEmail(e.target.value)} >
          Email
        </TextField>
        <TextField variant="outlined" type="password" label="Enter password" onChange={(e) => setPassword(e.target.value)} >
          Password
        </TextField>
        <TextField variant="outlined" type="password" label="Confirm password" onChange={(e) => setConfirmPassword(e.target.value)} >
          Confirm Password
        </TextField>
        <Button
          variant="contained"
          size="large"
          style={{ backgroundColor: "red" }}
          onClick={handleSubmit}
        >
          Signup
        </Button>
      </Box>
    </div>
  );
};

export default SignupForm;
