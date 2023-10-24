
import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

import {Grid, Box, Typography, Paper, Icon} from '@mui/material'

import Navbar from '../components/Navbar'
import AccomodationDescription from '../components/AccomodationDescription'
import GoogleMaps from '../components/utils/GoogleMaps'


import PriceTag from '../components/PriceTag'


const AccomodationPage = () => {

    const {date_from, date_to, id} = useParams()

    const [accomodation, setAccomodation] = useState(null)
    const [description, setDescription] = useState(null)
    const [space_details, setSpaceDetails] = useState(null)
    const [area_details, setAreaDetails] = useState(null)
    const [charge, setCharge] = useState(null)
    const [ratings, setRatings] = useState(null) 
    const [host, setHost] = useState(null)
    const [user, setUser] = useState([])
    const [profile, setProfile] = useState([])

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getAccomodation()
        setLoading(false)
    }, [id])

    let getAccomodation = async () => {
        
        let response = await fetch(`http://127.0.0.1:8000/api/accomodation/${id}`)
        let data = await response.json()

        setAccomodation(data.accomodation)
        setDescription(data.description)
        setSpaceDetails(data.space_details)
        setAreaDetails(data.area_details)
        setCharge(data.charge)
        setRatings(data.ratings)
        setHost(data.host)

        response = await fetch(`http://127.0.0.1:8000/auth/user_from_host/${data.host.host_id}`)
        data = await response.json()
        setUser(data.user)
        setProfile(data.profile)
    } 
    
    // console.log(loading)

    if (!accomodation && !area_details) {
        return <p>Loading...</p>
    }

    return (
        <>
            {/* {console.log(loading)} */}
            <Navbar></Navbar>
            <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    {/* Main Grid */}
                    <Grid container direction="column" spacing={4}>
                        <Grid item>
                            <Typography variant="h4" sx={{fontFamily: 'monospace', p: '20px 0px'}}><b> {accomodation?.name}</b></Typography>
                            {/* Maps and Image Display */}
                            <Grid container direction="row" spacing={4} sx={{display: 'flex', justifyContent: 'space-between', p: '10px 0px'}}>
                                <Grid item xs={8}>
                                <Box component="img" 
                                        alt={accomodation.name}
                                        src={accomodation.image}
                                        sx={{width: '80%', height: '100%', maxHeight: '100%', borderRadius: '16px'}}
                                    /> 
                                </Grid>
                                <Grid item xs={4} sx={{display: 'flex', justifyContent: 'center'}}>
                                    <Box sx={{width: '100%', height: '100%', borderRadius: '16px', p: '20px '}}>
                                        <GoogleMaps area_details={area_details}></GoogleMaps>
                                    </Box>
                                    
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            {/* Description and Price Display */}
                            <Grid container spacing={12}> 
                                <Grid item xs={8}>
                                    <AccomodationDescription  description={description} area_details={area_details} space_details={space_details} ratings={ratings} host={host} user={user} profile={profile}></AccomodationDescription>
                                </Grid>
                                <Grid item xs={4}>
                                    <PriceTag accomodation={accomodation} charge={charge} date_from={date_from} date_to={date_to}></PriceTag>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Box>
                    </Box>
                
                    
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
        </>
    )
}

export default AccomodationPage