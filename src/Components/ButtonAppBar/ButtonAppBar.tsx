import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import {useAppDispatch, useAppSelector} from "../../state/store";
import {logoutTC} from "../../features/Login/auth-reducer";
import {NavLink} from "react-router-dom";

const ButtonAppBar = () => {
    const isLogined = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()
    const logOutHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" style={{background: "#3b3939"}}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <NavLink className={'todolistLink'} to={'/'}> TodoLists </NavLink>
                    {isLogined && <Button sx={{ml: 'auto'}} color="inherit" onClick={logOutHandler}>Log out</Button>}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default ButtonAppBar;