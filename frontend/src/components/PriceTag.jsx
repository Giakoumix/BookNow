
import React, {useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

import {Paper, Grid, Box, Typography, Divider, Button} from '@mui/material'
import {indigo} from '@mui/material/colors'

import AuthContext from '../context/AuthContext';

const PriceTag = ( {accomodation, charge, date_from, date_to} ) => {

    const {user} = useContext(AuthContext)
    const [profile, setProfile] = useState({})
    const [tenant, setTenant] = useState({})

    const {location, adults, rooms, start_date, end_date} = useParams()

    let date1 = new Date(start_date)
    let date2 = new Date(end_date)
    const days = (date2-date1) / (1000 * 60 * 60 * 24)

    let price = parseFloat(charge.price.replace('$', ''))
    let cleaning_fee = charge.cleaning_fee ? parseFloat(charge.cleaning_fee.replace('$', '')) : 0

    useEffect(() => {
        get_profile()
    }, [])

    let get_profile = async () => {
        let response = await fetch(`http://127.0.0.1:8000/auth/get_profile_by_user/${user.user_id}`)
        let profile = await response.json()
        setProfile(profile)

        response = await fetch(`http://127.0.0.1:8000/auth/get_tenant_by_user/${user.user_id}`)
        let tenant = await response.json()
        setTenant(tenant)
    }

    let make_reservation = async () => {
        let message = `Your reservation at ${accomodation.name} with price ${price} has been made`
        
        let response = await fetch(`http://127.0.0.1:8000/auth/get_user_from_id/${user.user_id}`)
        let myuser = response.json() 
        console.log('Email', myuser.mail)
        response = await fetch(`http://127.0.0.1:8000/auth/send_email_to_tenant`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'message': message,
                'email': myuser.mail
            })
        })

        response = await fetch(`http://127.0.0.1:8000/api/create_reservation`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'date_from': date_from,
                'date_to': date_to,
                'accomodation_id': accomodation.accomodation_id,
                'tenant_id': tenant.tenant_id
            })
        })
    }

    return (
        <Paper elevation={7} direction="column" sx={{width: '100%', height: '400px', 
                borderRadius: '16px', p: '20px 20px', border: '1px solid',}}>
            {/* Price and Reservation Grid */}
            <Box sx={{display: 'flex', justifyContent: 'center', pb: '20px'}}>
                <Typography variant="h6" sx={{display: 'inline'}}><b>{charge.price}</b></Typography>
                <Typography variant="h6" sx={{display: 'inline', color: 'text.secondary'}}>/per night</Typography>
            </Box>     

            <Paper elevation={3} sx={{border: '1px solid'}}>
                <Grid container direction='column'>
                    <Grid item xs={6}>
                        <Box sx={{borderBottom: 1, display: 'flex', justifyContent: 'center'}}>
                            <Grid container >
                                <Grid item xs={6} direction="column" sx={{p: '5px'}}>
                                    <Typography sx={{fontSize: '85%'}}><b>Arrival</b></Typography>
                                    <Typography>{start_date}</Typography>
                                </Grid>
                                <Grid item xs={6} direction="column" sx={{p: '5px', borderLeft: 1}}>
                                    <Typography sx={{fontSize: '85%'}}><b>Departure</b></Typography>
                                    <Typography> {end_date}</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                        {/* <Divider orientation='horizontal' variant="inset"  sx={{m: 0.5, mb: '15px'}}></Divider> */}
                    <Grid item xs={6} sx={{p: '0px 5px', mb: '20px'}}>
                        <Typography sx={{display: 'inline', justifyContent: 'center', fontSize: '85%', top: '3px'}}><b>Visitors: </b></Typography>
                        <Typography sx={{display: 'inline', fontSize: '85%'}}>{adults}</Typography>
                    </Grid>
                </Grid>
            </Paper>
            {!user || profile.permissions === 'H' ? 
            <Box sx={{display: 'flex', justifyContent: 'center', p: '20px'}}>
                <Button variant="disabled" sx={{bgcolor: indigo[100], display: 'flex', justifyContent: 'center', letterSpacing: 2}}>
                    Reservation
                </Button>
            </Box>
                : 
            <Box sx={{display: 'flex', justifyContent: 'center', p: '20px'}}>
                <Button variant="contained" 
                        sx={{bgcolor: indigo[900], display: 'flex', justifyContent: 'center', letterSpacing: 2}}
                        onClick={make_reservation}
                        >
                    Reservation
                </Button>
            </Box>
            }

            <Box sx={{display: 'flex', justifyContent: 'space-between', pb: '10px'}}>
                <Typography>{charge.price} x {days} overnight stays</Typography>
                <Typography>$ {price*days}</Typography>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between', pb: '10px'}}>
                <Typography>Cleaning Fee </Typography>
                <Typography>$ {cleaning_fee}</Typography>
            </Box>
            
            <Divider></Divider>

            <Box sx={{display: 'flex', justifyContent: 'space-between', pt: '10px'}}>
                <Typography><b>Total Price: </b></Typography>
                <Typography><b>$ {price*days + cleaning_fee}</b></Typography>
            </Box>

        </Paper>
    )
}

export default PriceTag