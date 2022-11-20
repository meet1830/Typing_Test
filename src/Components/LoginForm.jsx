import React, { useState } from 'react'
import { Box, Button, TextField } from '@material-ui/core'
import { auth } from '../firebaseConfig';
import { useAlert } from '../Context/AlertContext';
import errorMapping from '../Utils/errorMessages';

const LoginForm = ({handleClose}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {setAlert} = useAlert();

    const handleSubmit = () => {
        if (!email || !password) {
            // alert('Enter all details');
            setAlert({
                open: true,
                type: 'warning',
                message: 'Please enter all details'
            });
            return;
        }
        // console.log(email, password);

        auth.signInWithEmailAndPassword(email, password)
        .then((ok) => {
            // alert('logged in');
            setAlert({
                open: true,
                type: 'success',
                message: 'Logged In'
            });
            handleClose();
        })
        .catch((err) => {
            // alert('not able to login');
            setAlert({
                open: true,
                type: 'error',
                message: errorMapping[err.code] || "Some error occured"
            });
            console.log(err);
        })
    }

  return (
    // using mui components to make login form
    // read documentation for attributes added
    <div>
        <Box
            p={3} // how many division want in the box
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                backgroundColor: 'white',
                padding: '10px',
            }}
        >
            <TextField
                variant='outlined'
                type='email' // gives validation for email
                label='Enter Email' // placeholder
                onChange={(e) => setEmail(e.target.value)}
            >
                Email
            </TextField>
            <TextField
                variant='outlined'
                type='password'
                label='Enter password'
                onChange={(e) => setPassword(e.target.value)}
            >
                Password
            </TextField>
            <Button
                variant='contained'
                size='large'
                style={{backgroundColor: "red"}}
                onClick={handleSubmit}
            >
                Login
            </Button>
        </Box>
    </div>
  )
}

export default LoginForm