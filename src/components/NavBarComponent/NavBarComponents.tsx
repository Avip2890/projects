import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import './NavBar.css';

const Navbar = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>

                {currentUser && (
                    <Typography variant="body1" className="navbar-user-email">
                        Welcome, {currentUser.email}
                    </Typography>
                )}


                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Button component={Link} to="/home" className="navbar-button">
                        Homepage
                    </Button>
                    <Button component={Link} to="/courses" className="navbar-button">
                        Courses
                    </Button>
                    <Button component={Link} to="/enrollments" className="navbar-button">
                        Enrollments
                    </Button>
                    <Button component={Link} to="/students" className="navbar-button">
                        Students
                    </Button>
                    {currentUser?.role === 'admin' && (
                        <Button component={Link} to="/dashboard" className="navbar-button">
                            Admin Page
                        </Button>
                    )}


                    <div className="auth-buttons">
                        {currentUser ? (
                            <Button onClick={handleLogout} className="navbar-button">
                                Logout
                            </Button>
                        ) : (
                            <>
                                <Button component={Link} to="/sign-in" className="navbar-button">
                                    Sign In
                                </Button>
                                <Button component={Link} to="/login" className="navbar-button">
                                    Login
                                </Button>
                            </>
                        )}
                    </div>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
