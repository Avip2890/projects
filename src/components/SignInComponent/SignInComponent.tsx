import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../../Context/AuthContext";


const SignInComponent = () => {
    const { register } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'student' | 'admin'>('student');
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newUser = register(email, password, role, '');
        if (newUser) {
            navigate('/login');
        }
        setEmail('');
        setPassword('');
    };

    return (
        <Box className="sign-in-container">
            <Typography variant="h4" gutterBottom>
                Sign In
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
                    Register
                </Button>
            </Box>
        </Box>
    );
};

export default SignInComponent;
