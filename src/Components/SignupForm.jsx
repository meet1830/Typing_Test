import React, { useState } from "react";
import { Box, Button, TextField } from "@material-ui/core";
import { auth, db } from "../firebaseConfig";
import errorMapping from "../Utils/errorMessages";
import { useAlert } from "../Context/AlertContext";
import { useTheme } from "../Context/ThemeContext";

const SignupForm = ({ handleClose }) => {
  // can also use refs instead of state to implement form functionality
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  const { setAlert } = useAlert();

  const { theme } = useTheme();

  const checkUserNameAvailability = async () => {
    // check every document in firebase if there is any username with id
    // pass in doc the id that want to search - here id is username 
    const ref = db.collection('usernames').doc(`${username}`);
    const response = await ref.get();
    // we will get a snapshot for username object
    // the response also has a boolean - exists which will tells us that if it has something or not. if there is something then there is a document present of that uid and it already exists
    // ! for if there exists a document then the function will return false
    return !response.exists;
  }

  const handleSubmit = async () => {
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

    // if username available then create user
    if (await checkUserNameAvailability()) {
      // console.log("username not taken");
      auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (res) => {
        // add the username to the db
        // res will return uid and user will be created and response will have uid of user
        const ref = await db.collection('usernames').doc(`${username}`).set({
          uid: res.user.uid
        })
        .then((response) => {
          setAlert({
            open: true,
            type: "success",
            message: "Account created",
          });
          handleClose();
        })
      })
      .catch((err) => {
        setAlert({
          open: true,
          type: "error",
          message: errorMapping[err.code] || "Some error occured",
        });
      });
    } 
    
    else {
      // console.log("username taken");
      setAlert({
        open: true,
        type: "warning",
        message: "username already exists",
      });
    }
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
          type="text"
          label="Enter username"
          onChange={(e) => setUsername(e.target.value)}
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
          type="email"
          label="Enter email"
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
