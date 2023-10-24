
import React from 'react'
import {useState} from 'react'
import {useParams, useNavigate, Navigate, redirect, Link} from 'react-router-dom'

import {Box, Stack, Paper, IconButton, InputBase, Typography, Grid, Button, Menu, MenuItem} from '@mui/material'

import SearchIcon from '@mui/icons-material/Search';

import {indigo, orange, blue} from '@mui/material/colors'

import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import BungalowIcon from '@mui/icons-material/Bungalow';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PageviewIcon from '@mui/icons-material/Pageview';

import {DatePicker} from 'antd'

import moment from 'moment'

const {RangePicker} = DatePicker;

const SearchBox = () => {

    let navigate = useNavigate()

    const {location, adults, rooms, start_date, end_date} = useParams()
    const [searchlocation, setLocation] = useState(location)
    const [dates, setDates] = useState([start_date, end_date])
    const [options, setOptions] = useState({
        adult:parseInt(adults),
        room:parseInt(rooms)
    })

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOptions = (name, operation) => {
        setOptions(prev => {
            return {
                ...prev,
                [name]: operation === "i" ? options[name]+1 : options[name]-1
            }
        })
    }

    let onChangeRangePicker = (date, dateStrings) => {
        if (date) { 
            setDates(dateStrings.map(item=>{
                return moment(item).format('YYYY-MM-DD')
            }))
            // console.log('From: ', date[0], ', to: ', date[1]);
            console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
          } else {
            console.log('Clear');
          }
    }

    return (
        <Box
            sx={{
                display: 'flex', justifyContent: 'space-between',
                borderRadius: '16px', flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 3, width: '80%', height: '100%',
                },
                
            }}
            >
            <Paper elevation={3} sx={{borderRadius: '16px',p: '10px 10px', backgroundColor: orange[500], 
                border: '2px solid',
                borderColor: indigo[900]}}>
                <Paper 
                    component="form"
                    sx={{display: "flex", justifyContent: 'center', mb: '10px', mt: '5px', 
                        borderRadius: '16px', border: '2px solid', borderColor: indigo[900]}}
                >
                    <IconButton sx={{p: '3px'}}>
                        <SearchIcon></SearchIcon>
                    </IconButton>
                    <InputBase
                        sx={{width: '180px', ml: 1, flex: 1,}}
                        placeholder="Where are you going?"
                        name="location"
                        defaultValue={location}
                        onChange={(e) => {setLocation(e.target.value)}}
                    >
                    </InputBase>
                </Paper>
                <Box sx={{display: 'flex', justifyContent: 'center', mb: '10px'}}>
                    <Button
                        // display="flex" 
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        startIcon={<EmojiPeopleIcon></EmojiPeopleIcon>}
                        endIcon={<BungalowIcon></BungalowIcon>}
                        sx={{display: 'flex', justifyContent: 'center', backgroundColor: 'white', 
                            color: blue[1000], fontFamily: "system-ui",
                            border: '2px solid', borderColor: indigo[900]
                        }}                                
                    >
                        adults: {options.adult} - rooms: {options.room}
                    </Button>
                </Box>
                
                <Menu
                    id="basic-menu"
                    display="flex"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    justifyContent="flex-end"                
                >
                    <MenuItem >adults: <IconButton disabled={options.adult<=1} onClick={() => handleOptions("adult", "d")}><RemoveIcon/></IconButton> {options.adult}  <IconButton onClick={() => handleOptions("adult", "i")}><AddIcon/></IconButton></MenuItem>
                    <MenuItem >rooms: <IconButton disabled={options.room<=1} onClick={() => handleOptions("room", "d")}><RemoveIcon/></IconButton> {options.room}  <IconButton onClick={() => handleOptions("room", "i")}><AddIcon/></IconButton></MenuItem>
                </Menu>

                <Box sx={{border: '2px solid', borderRadius: '8px', borderColor: indigo[900]}}>

                    <RangePicker
                        onChange={onChangeRangePicker}>   
                    </RangePicker>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'center', mb: '5px',mt: '10px'}}>
                    {/* <Link to={`/accomodations/${location}/${options.adults}/${options.rooms}/${dates[0]}/${dates[1]}`} > */}
                    <Button href={`/accomodations/${location}/${options.adult}/${options.room}/${dates[0]}/${dates[1]}`}
                            variant="contained" 
                            startIcon={<PageviewIcon/>} 
                            sx={{p: '10px', color: 'white', backgroundColor: blue[1000],
                                border: '2px solid', borderColor: indigo[900]}}>
                        <Typography sx={{fontFamily: "system-ui"}}>Search</Typography>
                    </Button>
                    {/* </Link> */}
                </Box>
            </Paper>
        </Box>
    )
}

export default SearchBox