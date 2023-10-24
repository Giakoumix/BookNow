
import React, {useState} from 'react'

import {Grid, Paper, Avatar, Typography, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material'

import { indigo } from '@mui/material/colors'

import Home from '@mui/icons-material/Home'
import Settings from '@mui/icons-material/Settings'
import Pages from '@mui/icons-material/Pages'
import StorefrontIcon from '@mui/icons-material/Storefront';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HostProfile from './HostProfile'
import Accomodations from './Accomodations'

const Host = ({user, profile, host, tenant}) => {

    const image = profile.image !== null ? profile.image : 'http://127.0.0.1:8000' + profile.profile_image
    const [button, setButton] = useState(0)

    return (
        <>
        <Grid container>
            <Grid item xs={4} sx={{pt: '5%'}}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => setButton(0)}>
                            <ListItemIcon>
                                <Home></Home>
                            </ListItemIcon>
                            <ListItemText primary="Account" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton onClick={() => setButton(1)}>
                            <ListItemIcon>
                                <Pages></Pages>
                            </ListItemIcon>
                            <ListItemText primary="Accomodations" />
                        </ListItemButton>
                    </ListItem>
                    
                </List>
            </Grid>
            <Grid item xs={4} sx={{ pt: '5%', }}>
                {button === 0 ? 
                    <HostProfile host={host} profile={profile} user={user} image={image} />
                : 
                    <></>
                }
                {button === 1 ?
                    <Accomodations></Accomodations>
                :
                <></>
                }

                

            </Grid>
            <Grid item xs={4}></Grid>
        </Grid>
        </>
    )
}

export default Host