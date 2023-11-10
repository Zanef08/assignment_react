import { Box, Typography, Divider, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';

const drawerWidth = 240;
const navItems = ['Our Cakes', 'Contact'];

export default function DrawerAppBar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [showProfile, setShowProfile] = useState(false); // Define showProfile state
    const [userOptionsPosition, setUserOptionsPosition] = useState({ top: 0, left: 0 });
    const navigate = useNavigate(); // Initialize useNavigate

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Cake Store
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <Link to={item === 'Our Cakes' ? '/' : item} key={item}>
                            <ListItemButton sx={{ textAlign: 'center' }}>
                                <ListItemText primary={item} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [userInfoVisible, setUserInfoVisible] = useState(false);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        if (user) {
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: 'application/json'
                }
            })
                .then((res) => {
                    setProfile(res.data);
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    const logOut = () => {
        googleLogout();
        setProfile(null);
        setShowProfile(false);
        setUserInfoVisible(false);
    };

    const handleOptionClick = (option) => {
        // Handle logic for each option
        if (option === 'profile') {
            if (profile) {
                navigate('/profile', { state: { picture: profile.picture, name: profile.name, email: profile.email } });
            } else {
                navigate('/'); // Redirect to the home page if not signed in
            }
        } else if (option === 'dashboard') {
            if (profile) {
                navigate('/dashboard');
            } else {
                navigate('/');
            }
        } else if (option === 'logout') {
            logOut();
            navigate('/');
        }
    };

    useEffect(() => {
        const avatarElement = document.querySelector('.user-info');
        if (avatarElement) {
            const rect = avatarElement.getBoundingClientRect();
            setUserOptionsPosition({ top: rect.bottom, left: rect.left });
        }
    }, [showProfile]);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav" sx={{backgroundColor: 'LightPink'}}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Cake Store
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            item === 'Dashboard' && !profile ? null : (
                                <Link to={item === 'Our Cakes' ? '/' : item} key={item}>
                                    <Button sx={{ color: '#fff' }}>{item}</Button>
                                </Link>
                            )
                        ))}
                    </Box>
                    <div className="login-section">
                        {profile ? (
                            <div className="user-info">
                                <Avatar
                                    alt="user image"
                                    src={profile.picture}
                                    onClick={() => setShowProfile(!showProfile)}
                                />
                            </div>
                        ) : (
                            <div className="login-button">
                                <Button
                                    className="google-login-button"
                                    onClick={login}
                                    variant="contained"
                                    sx={{ color: '#fff', backgroundColor: '#FF69B4'}}
                                >
                                    Sign in with Google
                                </Button>
                            </div>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            {showProfile && (
                <div className="user-info" style={{ position: 'fixed', top: '10%', right: '2%' }}>
                    <Paper style={{ width: '250px', padding: '16px' }} elevation={3} className="user-options">
                        <p onClick={() => handleOptionClick('profile')}>Profile</p>
                        <p onClick={() => handleOptionClick('dashboard')}>Dashboard</p>
                        <p onClick={() => handleOptionClick('logout')}>Logout</p>
                    </Paper>
                </div>
            )}
        </Box>
    );
}
