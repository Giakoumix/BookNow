
import React, { useState } from 'react'

import { Grid, Typography, Box, Icon, Divider, Avatar, 
        Stack, Collapse,List, ListItemText, ListItemButton, 
        ListItemIcon} from '@mui/material'

import {ExpandLess, ExpandMore} from '@mui/icons-material' 

import StarIcon from '@mui/icons-material/Star';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import DirectionsTransitFilledIcon from '@mui/icons-material/DirectionsTransitFilled';
import SummarizeIcon from '@mui/icons-material/Summarize';

// import { Divider } from 'antd';

const AccomodationDescription = ( {description, area_details, space_details, ratings, host, user, profile} ) => {

    const [openNeighbourhood, setOpenNeighbourhood] = React.useState(false);
    const [openSummury, setOpenSummury] = useState(false);
    const [openTransit, setOpenTransit] = useState(false)

    const handleNeighbourhood = () => {
        setOpenNeighbourhood(!openNeighbourhood);
    };

    const handleSummury = () => {
        setOpenSummury(!openSummury)
    }

    const handleTransit = () => {
        setOpenTransit(!openTransit)
    }

    const amenities = space_details.amenities.replaceAll('"', '').replaceAll('/', '').replaceAll('{', '').replaceAll('}', '').split(',')

    return (
        <>
            <Typography variant="h6" sx={{display: 'inline'}}><b> {space_details?.room_type}</b></Typography>
            <Typography variant="h6" sx={{display: 'inline'}}><b> - {area_details.street} {area_details.city} </b></Typography>
            <Typography> </Typography>

            <Typography sx={{display: 'inline', color: 'text.primary'}} >{space_details?.accomodates ? space_details?.accomodates : 0} visitors</Typography>
            <Typography sx={{display: 'inline', color: 'text.primary'}} > - {space_details?.bedrooms ? space_details?.bedrooms : 0} bedrooms</Typography>
            <Typography sx={{display: 'inline', color: 'text.primary'}} > - {space_details?.beds ? space_details?.beds : 0} beds</Typography>
            <Typography sx={{display: 'inline', color: 'text.primary'}} > - {space_details?.bathrooms ? space_details?.bathrooms : 0} bathrooms</Typography>
            <Typography> </Typography>
                                    
            {ratings.rating ? <><Box sx={{display: 'flex'}}>
                <Icon sx={{display: 'inline'}}>
                    <StarIcon></StarIcon>
                </Icon>
                <Typography sx={{display: 'inline', position: 'relative', top: '3px'}}> {ratings.rating/10}</Typography>
                </Box>
                </> : <> </>
            }

            <Divider sx={{p: '10px'}}></Divider> 
            <Stack direction="row" sx={{p: '10px'}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>

                <Avatar src={profile.image}></Avatar>
                <Typography sx={{pl: '10px'}}><b>Host: {user.username}</b></Typography>
                </Box>
            </Stack>
            <Divider></Divider>                 
            
            <Box sx={{p: '10px'}}></Box>

            <Typography sx={{fontSize: '105%'}}><b>What does this place offer:</b></Typography>
                
            <Grid container spacing={2}>
                {amenities.map((amenity, index) => (
                    <Grid item xs={6} key={index}>
                        <Typography sx={{pl: '10px', fontSize: '105%'}}>{amenity}</Typography>
                    </Grid>
                ))}
            </Grid>
                
            <Box sx={{p: '10px'}}></Box>
            
            {description.description ? <>
            
                <Typography sx={{fontSize: '105%'}}><b>Description: </b></Typography>
                <Typography sx={{p:1}}>{description.description}</Typography>
            </> : <> 
                <Typography> </Typography>
            </>}

            {description.summury ? <>
            
            <Typography sx={{fontSize: '105%'}}><b>Summury: </b></Typography>
            <Typography sx={{p:1}}>{description.summury}</Typography>
            </> : <> 
            <Typography> </Typography>
            </>}

            <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            >
                {description.neighbourhoood_overview ? ( <>
                <ListItemButton onClick={() => handleNeighbourhood()}>
                    <ListItemIcon>
                        <MapsHomeWorkIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Neighbourhood" />
                    {openNeighbourhood ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openNeighbourhood} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary={description.neighbourhoood_overview} />
                    </ListItemButton>
                    </List>
                </Collapse>
                </>
                ) : (
                    <></>
                )
                }

                {description.summury ? ( <>
                <ListItemButton onClick={() => handleSummury()}>
                    <ListItemIcon>
                        <SummarizeIcon/>
                    </ListItemIcon>
                    <ListItemText primary="summury" />
                    {openSummury ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openSummury} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary={description.space} />
                    </ListItemButton>
                    </List>
                </Collapse>
                </>
                ) : (
                    <></>
                )
                }

                {description.transit ? ( <>
                <ListItemButton onClick={() => handleTransit()}>
                    <ListItemIcon>
                        <DirectionsTransitFilledIcon/>
                    </ListItemIcon>
                    <ListItemText primary="transit" />
                    {openTransit ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openTransit} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary={description.space} />
                    </ListItemButton>
                    </List>
                </Collapse>
                </>
                ) : (
                    <></>
                )
                }

            </List>
        </>
    )
}

export default AccomodationDescription