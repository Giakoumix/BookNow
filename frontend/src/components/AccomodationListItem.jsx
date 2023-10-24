
import React from 'react'
import {useParams, Link} from 'react-router-dom'

import {Box, Typography, Card, CardActionArea, CardMedia, Grid, Rating} from '@mui/material'

import {indigo, blue, teal, red, orange} from '@mui/material/colors'

const AccomodationListItem = ({ accomodation, description, charge, ratings, space_details }) => {

    const {location, adults, rooms, start_date, end_date} = useParams()
    
    let date1 = new Date(start_date)
    let date2 = new Date(end_date)

    const cancelation_color = accomodation.cancelation_policy !== 'strict' ? teal[500] : red[900]

    const days = (date2-date1) / (1000 * 60 * 60 * 24)
    

    let chooseRating = (rating) => {
        rating = rating/10
        if (rating >= 9.5) {
            return ["Exceptional", indigo[900]]
        }
        if (rating >= 9) {
            return ["Superb", indigo[500]]
        }
        if (rating >= 8.5) {
            return ["Fabulous", indigo[500]]
        }
        if (rating >= 8) {
            return ["Very Good", indigo[500]]
        }
        if (rating >= 7) {
            return ["Good", indigo[500]]
        }
        if (rating === 0) {
            return ["No Ratings", 'black']
        }
        else {
            return ["Average", indigo[500]]
        }
    }

    const [rating, colorRating] = chooseRating(ratings.rating ? ratings.rating : 0)

    return (
        <>
        {/* <Link to={`/accomodations/${accomodation.accomodation_id}`}> */}
            <Card elevation={5} sx={{display: 'flex', justifyContent: 'center', mt: '10px', p: '10px'}}>
                {/* <CardActionArea> */}
                    <Grid container >
                        <Grid item xs={4} sx={{p: '2px'}}>
                            <CardMedia
                            component="img"
                            sx={{width: 280, borderRadius: '12px'}}
                            image={accomodation.image}
                            alt="Accomodation Image"
                            />
                        </Grid>

                        <Grid item xs={6} spacing={8} sx={{p: '2px',flexDirection: 'column', display: 'flex', justifyContent: 'space-between'}}>
                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                <Link to={`/accomodations/${location}/${adults}/${rooms}/${start_date}/${end_date}/${accomodation.accomodation_id}`} style={{textDecoration: 'none'}}>
                                    <Typography sx={{fontSize: '110%', color: indigo[500]}}><b> {accomodation.name}</b></Typography>
                                </Link>
                                <Typography sx={{fontSize: '90%', color: indigo[500], flexDirection: 'column'}}>{description.description.slice(0, 60)}<b>...</b></Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1" style={{color: 'rgba(0,0,0,0.7)'}} sx={{fontSize: '90%'}}>
                                    <b>Room type: </b>{space_details.room_type ? space_details.room_type : ''} <br/> <b>Bathroom: </b>{space_details.bathroom ? space_details.bathroom : 'None'}, 
                                    <b>Bedrooms: </b>{space_details.bedrooms ? space_details.bedrooms : 'None'}, <b>Beds: </b>{space_details.beds ? space_details.beds : 'None'}
                                    <br/> <b>Amenities: </b>{space_details.amenities ? space_details.amenities.replaceAll('{', '').replaceAll('}', '').replaceAll('"', '').replaceAll('"', '').slice(0,70) + '...' : 'None'}
                                </Typography>
                            </Box>
                            <Box >
                                <Typography sx={{fontSize: '95%', color: indigo[500], display: 'inline'}}><b>Cancelatio Policy:</b></Typography>
                                <Typography sx={{fontSize: '95%', color: cancelation_color, display: 'inline'}}><b> {accomodation.cancelation_policy}</b></Typography>
                                
                            </Box>
                        </Grid>

                        <Grid item xs={2} sx={{p: '2px', flexDirection: 'column', display: 'flex', justifyContent: 'space-between'}}>
                            <Box>
                                <Typography sx={{color: colorRating, display: 'inline'}}><b>{rating} </b></Typography>
                                <Box sx={{bgcolor: indigo[500], display: 'inline', borderRadius: '5px', p: '5px', justifyContent: 'center'}}>
                                    <Typography sx={{color: 'white', display: 'inline'}}>
                                        <b>{ratings.rating ? ratings.rating/10 : 0}</b>
                                    </Typography>
                                </Box>
                            </Box>
                            <Box>
                                <Typography sx={{fontSize: '107%', display: 'inline'}}><b>Price: </b></Typography>
                                <Typography sx={{ display: 'inline', color: indigo[500],}}><b>{parseFloat(charge.price.replace("$", ""))*(days)}$</b></Typography>
                                <Typography sx={{color: indigo[500], fontSize: '85%', fontWeight: 'light'}}>Included taxes and fees</Typography>
                                <Rating name="read-only" value={ratings.rating ? (ratings.rating/20) : 0} readOnly />
                            </Box>
                        </Grid>
                    </Grid>    
                {/* </CardActionArea> */}
            </Card>
        {/* </Link> */}
    </>
    )
}

export default AccomodationListItem