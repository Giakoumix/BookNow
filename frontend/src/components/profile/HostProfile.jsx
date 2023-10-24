
import React from 'react'

import {Grid, Paper, Avatar, Typography, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material'

import { indigo } from '@mui/material/colors'

const HostProfile = ({user, profile, host, image}) => {
    return (
        <>
            <Paper elevation={5} sx={{p: '30px', borderRadius: '16px',display: 'flex', justifyContent: 'center',  width: '100%', height: '100%'}}>
                    <Grid container>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            <Box>
                                <Avatar src={image} sx={{display: 'flex', justifyContent: 'center',width: 200, height: 200, border: '2px solid', borderColor: indigo[900]}}></Avatar>
                                <Typography sx={{pl: '30px',display: 'flex', justifyContent: 'center'}}><b>{user.username}</b></Typography>
                            </Box>

                            <Box sx={{pl: '30px',pt: '10%', display: 'flex', justifyContent: 'center'}}>
                                <Typography sx={{display: 'inline'}}><b>Username: </b></Typography>
                                <Typography sx={{display: 'inline'}}>{user.username}</Typography>
                            </Box>
                            <Box>
                                <Typography sx={{display: 'inline'}}><b>Password: </b></Typography>
                                <Typography sx={{display: 'inline'}}>{user.password.slice(0, 20)}</Typography>
                            </Box>
                            {
                                user.email ? <Box>
                                <Typography sx={{pl: '30px',display: 'inline'}}><b>Email: </b></Typography>
                                <Typography sx={{display: 'inline'}}>{user.email}</Typography>
                            </Box> :
                            <></>
                            }
                            <Box sx={{pl: '30px',pt: '10%', display: 'flex', justifyContent: 'center'}}>
                                <Typography sx={{display: 'inline'}}><b>Location: </b></Typography>
                                <Typography sx={{display: 'inline'}}>{host.host_location}</Typography>
                            </Box>
                            <Box sx={{pl: '30px',pt: '10%', display: 'flex', justifyContent: 'center'}}>
                                <Typography sx={{display: 'inline'}}><b>About: </b></Typography>
                                <Typography sx={{display: 'inline'}}>{host.host_about}</Typography>
                            </Box>

                            <Box sx={{pl: '30px',pt: '10%', display: 'flex', justifyContent: 'center'}}>
                                <Typography sx={{display: 'inline'}}><b>Neighbourhood: </b></Typography>
                                <Typography sx={{display: 'inline'}}>{host.host_neighbourhood}</Typography>
                            </Box>
                            <Box sx={{pl: '30px',pt: '10%', display: 'flex', justifyContent: 'center'}}>
                                <Typography sx={{display: 'inline'}}><b>Verifications: </b></Typography>
                                <Typography sx={{display: 'inline'}}>{host.host_verifications}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}></Grid>
                    </Grid>
                    
                    
            </Paper>
        </>
    )
}

export default HostProfile