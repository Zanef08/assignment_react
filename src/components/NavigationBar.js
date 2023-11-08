import { Box, Typography, Divider, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';

const drawerWidth = 240;
const navItems = ['Home', 'Dashboard', 'Contact'];

export default function DrawerAppBar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Football News
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
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
        setUserInfoVisible(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav">
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
                        Football News
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            item === 'Dashboard' && !profile ? null : (
                                <Link to={item === 'Home' ? '/' : item} key={item}>
                                    <Button sx={{ color: '#fff' }}>{item}</Button>
                                </Link>
                            )
                        ))}
                    </Box>
                    {profile ? (
                            <div className="user-info">
                                <Avatar
                                    alt="user image"
                                    src={profile.picture}
                                    onClick={() => {
                                        console.log('Avatar clicked');
                                        setUserInfoVisible(!userInfoVisible);
                                    }}
                                />
                            </div>
                        ) : (
                    <Link style={{marginRight: '8px', marginLeft: '8px'}} to="/login"> 
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ color: '#fff' }}
                        >
                            Login
                        </Button>
                    </Link>
                    )}
                    {/* Add "Sign in with Google" button here */}
                    <div className="login-section">
                        {profile ? (
                            <div className="user-info">
                                <Avatar
                                    alt="user image"
                                    src={profile.picture}
                                    onClick={() => {
                                        console.log('Avatar clicked');
                                        setUserInfoVisible(!userInfoVisible);
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="login-button">
                                <Button
                                    className="google-login-button"
                                    onClick={login}
                                    variant="contained"
                                    color="primary"
                                    sx={{ color: '#fff' }}
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
            {userInfoVisible && profile && (
                <div className="user-info" style={{ position: 'fixed', top: '10%', right: '2%' }}>
                    <Paper style={{ width: '250px', padding: '16px' }} elevation={3} className="user-info-dropdown">
                        <h4 className="welcome-message">{profile.name}</h4>
                        <p className="email-address">{profile.email}</p>
                        <div style={{ textAlign: 'right' }} className="logout-button-container">
                            <button style={{
                                backgroundColor: 'black',
                                color: 'white',
                                padding: '8px 16px',
                                border: 'none',
                                cursor: 'pointer'
                            }} className="logout-button" onClick={logOut}>
                                Log out
                            </button>
                        </div>
                    </Paper>
                </div>
            )}
        </Box>
    );
}
