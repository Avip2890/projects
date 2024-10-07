import React from 'react';
import {AppBar, Toolbar, Typography, Button} from '@mui/material';
import {Link} from 'react-router-dom';
import './NavBar.css'

const Navbar = () => {
    return (
        <AppBar>
            <Toolbar>
                <Typography variant="h6" className="title">
                    Students & Courses
                </Typography>

                <div className="navbar-buttons">
                    <Button component={Link} to="/courses" className="navbar-button">
                        Courses
                    </Button>
                    <Button component={Link} to="/students" className="navbar-button">
                        Students
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
