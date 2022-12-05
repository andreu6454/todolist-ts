import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import {useAppDispatch, useAppSelector} from "../../state/store";
import {logoutTC} from "../../features/Login/auth-reducer";

const ButtonAppBar = () => {
    const isLoggined = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()
    const logOutHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{background: "#3b3939"}}>
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
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        TodoLists
                    </Typography>
                    {isLoggined && <Button color="inherit" onClick={logOutHandler}>Log out</Button>}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default ButtonAppBar;