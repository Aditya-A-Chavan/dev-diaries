import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    // Check if user data exists in session storage
    const isLoggedIn = !!sessionStorage.getItem('userData'); // Returns true if userData is present

    const handleLogout = () => {
        sessionStorage.removeItem('userData'); // Clear user session
        navigate('/login'); // Redirect to login page
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    component={Link}
                    to="/dashboard"
                    sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
                >
                    Dev Diaries
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Button color="inherit" component={Link} to="/dashboard">
                        Dashboard
                    </Button>
                    <Button color="inherit" component={Link} to="/create-blog">
                        Create Blog
                    </Button>
                    {!isLoggedIn && (
                        <>
                            <Button color="inherit" component={Link} to="/login">
                                Login
                            </Button>
                            <Button color="inherit" component={Link} to="/register">
                                Register
                            </Button>
                        </>
                    )}
                    {isLoggedIn && (
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    )}
                </Stack>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
