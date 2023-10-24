
import React from 'react'

import {Grid, Paper, Avatar, Typography, Box, Stack} from '@mui/material'

import { indigo } from '@mui/material/colors'


const Tenant = ({user, profile, tenant}) => {
    // console.log('Image ', profile.image)
    console.log('Profile Image',('http://127.0.0.1:8000' + profile.profile_image))
    const image = profile.image !== null ? profile.image : 'http://127.0.0.1:8000' + profile.profile_image

    return (
        <Grid container >
            <Grid item xs={4}></Grid>
            <Grid item xs={4} sx={{ pt: '5%', }}>
                <Paper elevation={5} sx={{p: '30px', borderRadius: '16px',display: 'flex', justifyContent: 'center', width: '100%', height: '500px'}}>
                    <Grid container sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', alignContent: 'center'}}>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            <Box sx={{alignItems: 'center'}}>

                                <Avatar alt={user.username} src={image} sx={{display: 'flex', justifyContent: 'center',width: 200, height: 200, border: '2px solid', borderColor: indigo[900]}}></Avatar>
                                <Typography sx={{pl: '30px',display: 'flex', justifyContent: 'center'}}><b>{user.username}</b></Typography>
                            </Box>
                            <Box sx={{pl: '30px',pt: '10%', display: 'flex', justifyContent: 'center'}}>
                                <Typography sx={{display: 'inline'}}><b>Username: </b></Typography>
                                <Typography sx={{display: 'inline'}}>{user.username}</Typography>
                            </Box>
                            <Box>
                                <Typography sx={{display: 'inline'}}><b>Password: </b></Typography>
                                <Typography sx={{display: 'inline'}}>{user.password.slice(0, 30)}</Typography>
                            </Box>
                            {
                                user.email ? <Box>
                                <Typography sx={{display: 'inline'}}><b>Email: </b></Typography>
                                <Typography sx={{display: 'inline'}}>{user.email}</Typography>
                            </Box> :
                            <></>
                            }
                            

                            
                        </Grid>
                        <Grid item xs={4}></Grid>
                    </Grid>
                    {/* <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Stack direction="column" sx={{display: 'flex', justifyContent: 'center',  alignItems: 'center'}}>

                        <Avatar alt={user.username} src={image} sx={{width: 200, height: 200, border: '2px solid', borderColor: indigo[900]}}></Avatar>
                        <Typography>{user.username}</Typography>
                    </Stack>
                    </Box> */}
                </Paper>
            </Grid>
            <Grid item xs={4}></Grid> 
        </Grid>
    )
}

export default Tenant