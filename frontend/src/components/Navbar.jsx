
import React, { useContext } from 'react'
import {useNavigate} from 'react-router-dom'

import {AppBar, Toolbar, Typography, Grid, styled, IconButton, Button} from '@mui/material'
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import AuthContext from '../context/AuthContext';

const StyledToolbar = styled(Toolbar) ({
    display: "flex",
    justifyContent: "space-between",
})

const Navbar = () => {

    let navigate = useNavigate()
    let {user, logoutUser} = useContext(AuthContext)

    const goHome = () => {navigate("/")}
    const goToLogin = () => {navigate("/login")}
    const goToRegister = () => {navigate("/register")}
    const goToAccount = () => {
        if (user.username === 'egoeimai7' && user.username === 'egoeimai7') {
            navigate("/admin")
        }
        else {
            navigate("/acount")
        }
    }

    return (
        <AppBar position='sticky' sx={{borderRadius: '16px'}}>
            
            <StyledToolbar disableGutters>
                <Grid container alignItems="center" spacing={1} sx={{ml: 2}}>
                    <Grid item>
                    
                        <IconButton onClick={goHome} sx={{display: 'flex', color: "white"}}>
                            <ImportContactsIcon sx={{ml: 1}}/>
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                alignContent: 'center',
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}>
                            BookNow
                        </Typography>
                    </Grid>
                </Grid>

                {user ?
                    <Grid container justifyContent="right" alignItems="center" spacing={1} sx={{mr:2, }}>
                        <Grid item>
                            <IconButton color="inherit" onClick={goToAccount}>
                                <AccountBoxIcon/>
                            </IconButton>  
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" color="inherit" sx={{fontFamily: 'monospace',}} onClick={logoutUser}>Logout</Button>
                        </Grid>       
                    </Grid>
                    :
                    <Grid container justifyContent="right" alignItems="center" spacing={1} sx={{mr:2, }}>
                        <Grid item>
                            <Button variant="outlined" color="inherit" sx={{fontFamily: 'monospace',}} onClick={goToLogin}>Login</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" color="inherit" sx={{fontFamily: 'monospace',}} onClick={goToRegister}>Register</Button>
                        </Grid>
                    </Grid>
                }
            </StyledToolbar>
            
        </AppBar>
    )
}

export default Navbar


