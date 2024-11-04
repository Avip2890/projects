import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import {useAuth} from "../../Context/AuthContext";



const LogIn = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user = login(email, password);
        if (user) {
            console.log("Successfully logged in");
        }
        setEmail('');
        setPassword('');
    };

    return (
        <Box className="login-container">
            <Typography variant="h4" gutterBottom>
                Log In
            </Typography>
            <Box component="form" onSubmit={handleSubmit} className="form-container">
                <TextField
                    fullWidth
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                />
                <Button variant="contained" color="primary" type="submit">
                    Log In
                </Button>
            </Box>
        </Box>
    );
};

export default LogIn;
