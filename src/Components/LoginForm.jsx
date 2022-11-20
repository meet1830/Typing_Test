import React, { useState } from 'react'
import { Box, Button, TextField } from '@material-ui/core'
import { auth } from '../firebaseConfig';

const LoginForm = ({handleClose}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        if (!email || !password) {
            alert('Enter all details');
            return;
        }
        // console.log(email, password);

        auth.signInWithEmailAndPassword(email, password)
        .then((ok) => {
            alert('logged in');
            handleClose();
        })
        .catch((err) => {
            alert('not able to login');
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