
import React from 'react'
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

import {Grid, Typography, Box, Stack, Menu, MenuItem, Divider, Button, Paper, FormGroup, FormControl, FormControlLabel,Checkbox, Radio, RadioGroup} from '@mui/material'

import Navbar from '../components/Navbar'
import AccomodationListItem from '../components/AccomodationListItem'
import SearchBox from '../components/SearchBox'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const AccomodationsPage = () => {

    const {location, adults, rooms, start_date, end_date} = useParams()
    const [accomodations, setAccomodations] = useState([])
    const [descriptions, setDescriptions] = useState([])
    const [charges, setCharges] = useState([])
    const [ratings, setRatings] = useState([])
    const [space_details, setSpaceDetails] = useState([])
    const [searchlocation, setLocation] = useState(location)

    const pricesButton = ['Low to High', 'High to Low']
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const roomTypeOptions = ['All', 'Entire Home', 'Private Room', 'Shared Room']
    const [roomTypeIndex, setRoomTypeIndex] = useState(0)

    const [amenitiesIndex, setAmenitiesIndex] = useState({
        'Internet': false, 
        'Heating': false,
        'Kitchen': false,
        'Tv': false,
        'Parking': false,
        'Elevator': false
    })

    const handleAmenities = (optionName) => {
        setAmenitiesIndex((prevOption) => ({
                ...prevOption,
                [optionName]: !prevOption[optionName]
        }))
    }

    const handleRoomType = (index) => {
        setRoomTypeIndex(index)
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (index) => {
        setSelectedIndex(index)
        setAnchorEl(null);
    };

    useEffect(() => {
        searchResults(pricesButton[selectedIndex])
    }, [selectedIndex, roomTypeIndex, amenitiesIndex])

    let searchResults = async (priceOption) => {
        let response = await fetch(`http://127.0.0.1:8000/search/accomodations/${location}/${adults}/${rooms}/${start_date}/${end_date}/${priceOption}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        }).catch((error) => {console.error('Error fetching data', error)})
        let data = await response.json()
        setAccomodations(data.accomodations)
        setDescriptions(data.descriptions)
        setCharges(data.charges)
        setRatings(data.ratings)
        setSpaceDetails(data.space_details)
    }

    let filterBy = (space_details) => {
        if (filterByRoomType(space_details)) {
            if (filterByAmenities(space_details)) {
                return true
            }
        }
        return false
    }

    let filterByAmenities = (space_details) => {
        let amenities = space_details.amenities.replaceAll('"', '').replaceAll('/', '').replaceAll('{', '').replaceAll('}', '').split(',')
        amenities = amenities.map((str) => str.toLowerCase())
        let temp = true

        for (let amenity in amenitiesIndex) {
            if (amenitiesIndex[amenity] && !amenities.some((str) => str.includes(amenity.toLowerCase()))) {
                temp = false
            }
        }

        return temp
    }

    let filterByRoomType = (space_details) => {
        if (!roomTypeIndex) {
            return true
        }
        else if (space_details.room_type.toLowerCase().includes(roomTypeOptions[roomTypeIndex].toLowerCase())) {
            return true
        }

        return false
    }

    return (
        <>
        <Navbar></Navbar>
        <Grid container sx={{diplay: 'flex', justifyContent: 'center', p: '20px 0px'}}>
            <Grid item xs={1}> </Grid>
            <Grid item xs={9}>
                <Grid container>
                    <Grid item xs={3}>
                        <Box sx={{position: 'sticky', top: '4rem'}}>
                    {/* <Typography>Search Box</Typography> */}
                <SearchBox></SearchBox>
                <Box
                    sx={{
                        display: 'flex', justifyContent: 'center',
                        borderRadius: '16px', flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1, width: '80%', height: '100%',
                        },
                    }}
                    >
                    <Paper elevation={3} sx={{borderRadius: '16px',}}> 
                        <Typography sx={{p: '10px 10px', fontSize: '105%'}}><b>Filter by:</b></Typography>
                        <Divider orientation='horizontal' sx={{m: 0.5, mb: '15px'}}></Divider>
                        <Typography sx={{p: '0px 10px', fontSize: '95%'}}><b>Room Type: </b></Typography>
                        <FormControl sx={{fontSize: '95%', p: '0px 10px'}}>
                            <RadioGroup>
                                <FormControlLabel value="All" control={<Radio/>} onClick={() => handleRoomType(0)} label={<Typography sx={{fontSize: '95%', display: 'inline'}}>All</Typography>}/>
                                <FormControlLabel value="Apartment" control={<Radio />} onClick={() => handleRoomType(1)} label={<Typography sx={{fontSize: '95%', display: 'inline'}}>Apartment</Typography>}></FormControlLabel>
                                <FormControlLabel value="Private Room" control={<Radio />} onClick={() => handleRoomType(2)} label={<Typography sx={{fontSize: '95%', display: 'inline'}}>Private Room</Typography>} />
                                <FormControlLabel value="Shared Room" control={<Radio />} onClick={() => handleRoomType(3)} label={<Typography sx={{fontSize: '95%', display: 'inline'}}>Shared Room</Typography>} />
                            </RadioGroup>
                        </FormControl>

                        <Divider orientation='horizontal' sx={{m: 0.5, mb: '15px'}}></Divider>
                        <Typography sx={{p: '0px 10px', fontSize: '95%'}}><b>Amenities:</b></Typography>
                        <FormGroup sx={{p: '0px 10px'}}>
                            <FormControlLabel control={<Checkbox />} onChange={() => handleAmenities('Internet')} label={<Typography sx={{fontSize: '95%', display: 'inline'}}>Wifi</Typography>} />
                            <FormControlLabel control={<Checkbox />} onChange={() => handleAmenities('Heating')} label={<Typography sx={{fontSize: '95%', display: 'inline'}}>Heat</Typography>} />
                            <FormControlLabel control={<Checkbox />} onChange={() => handleAmenities('Kitchen')} label={<Typography sx={{fontSize: '95%', display: 'inline'}}>Kitchen</Typography>} />
                            <FormControlLabel control={<Checkbox />} onChange={() => handleAmenities('Tv')} label={<Typography sx={{fontSize: '95%', display: 'inline'}}>Tv</Typography>} />
                            <FormControlLabel control={<Checkbox />} onChange={() => handleAmenities('Parking')} label={<Typography sx={{fontSize: '95%', display: 'inline'}}>Parking</Typography>} />
                            <FormControlLabel control={<Checkbox />} onChange={() => handleAmenities('Elevator')} label={<Typography sx={{fontSize: '95%', display: 'inline'}}>Elevator</Typography>} />
                        </FormGroup>
                    </Paper>
                </Box>
                </Box>
                    </Grid>
                    <Grid item xs={9}>
                    <Typography variant="h6" sx={{mb: '30px'}}><b>{location}: {accomodations.length} properties found</b></Typography>
                <Divider orientation='horizontal' sx={{m: 0.5, mb: '15px'}}></Divider>
                <Stack direction='row' spacing={2} sx={{display: 'flex', alignItems: 'center', mb: '15px'}}>
                    <Typography><b>Ordered by: </b></Typography>
                    
                    <Button
                        id="basic-button"
                        variant= 'outlined'
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        sx={{borderRadius: '16px'}}
                    >
                        Prices: {pricesButton[selectedIndex]} <ArrowDropDownIcon />
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        {
                            pricesButton.map((option, index) => (
                                <MenuItem
                                    key={index}
                                    onClick={() => handleClose(index)}
                                >
                                    {option}
                                </MenuItem>
                            )) 
                        }
                    </Menu>
                </Stack>
                <Divider orientation='horizontal' sx={{m: 0.5, mb: '15px'}}></Divider>
                {accomodations.map((accomodation, index) => (
                    <>  
                        {}
                        {filterBy(space_details[index]) ? 
                            <AccomodationListItem key={index} accomodation={accomodation} description={descriptions[index]} charge={charges[index]} ratings={ratings[index]} space_details={space_details[index]}></AccomodationListItem>
                        : 
                            <></>
                        }
                    </>
                ))}
                    </Grid>
                </Grid>
                <Grid item xs={3}> </Grid>
            </Grid>
        </Grid>
        </>
    )
}


export default AccomodationsPage

