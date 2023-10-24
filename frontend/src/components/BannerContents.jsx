
import React from 'react'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Typography,
        Paper, InputBase, Divider,
        IconButton, Button, Menu,
        MenuItem} from '@mui/material'

import {styled} from '@mui/material/styles'
import {indigo, orange} from '@mui/material/colors'

import SearchIcon from '@mui/icons-material/Search';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import BungalowIcon from '@mui/icons-material/Bungalow';
import PageviewIcon from '@mui/icons-material/Pageview';


import {DatePicker} from 'antd'

import moment from 'moment'

const {RangePicker} = DatePicker;

const BannerTitle = styled(Typography) (() => ({
    lineHeight: '1.5',
    fontSize: '72px',
    marginTop: '10px',
    color: 'white',
}))


const BannerContents = () => {

    let navigate = useNavigate()

    const [accomodations, setAccomodations] = useState([])
    const [location, setLocation] = useState(null)
    const [dates, setDates] = useState([null, null])
    const [options, setOptions] = useState({
        adult:1,
        room:1
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

    let handleLocationChange = (e) => {
        setLocation(e.target.value)
    }

    let onChangeRangePicker = (date, dateStrings) => {
        if (date) {
            setDates(dateStrings.map(item=>{
                return moment(item).format('YYYY-MM-DD')
            }))
            console.log('From: ', date[0], ', to: ', date[1]);
            console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
          } else {
            console.log('Clear');
          }
    }

    return (
        <>
        <BannerTitle><b>Find your Destination...</b></BannerTitle>
        <Typography sx={{color: 'white', ml: "40px", fontSize: "27px"}}>Search the best prices on hotels</Typography>
        <Paper 
            component="form"
            variant="border"
            sx={{p: '10px 4px', display: "flex",alignItems: 'center', width: 1000, border: '3px solid', borderColor: orange[500]}}
        >
            <IconButton sx={{p: '10px'}}>
                <SearchIcon></SearchIcon>
            </IconButton>
            <InputBase
                sx={{width: '100%', ml: 1, flex: 1}}
                placeholder="Where are you going?"
                name="location"
                onChange={handleLocationChange}
            />
                    
            <Divider sx={{height: 28, m: 0.5}} orientation='vertical'/>
            <Button
                display="flex"
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                startIcon={<EmojiPeopleIcon></EmojiPeopleIcon>}
                endIcon={<BungalowIcon></BungalowIcon>}
                sx={{color: indigo[500], fontFamily: "system-ui"}}                                
            >
                adults: {options.adult} - rooms: {options.room}
            </Button>
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
            <Divider sx={{height: 28, m: 0.5}} orientation='vertical'/>
            <RangePicker
                onChange={onChangeRangePicker}>   
            </RangePicker>

            <Divider sx={{height: 28, m: 0.5}} orientation='vertical'/>

            <Button onClick={() => navigate(`accomodations/${location}/${options.adult}/${options.room}/${dates[0]}/${dates[1]}`)} variant="contained" startIcon={<PageviewIcon/>} sx={{p: '10px', color: 'white', backgroundColor: indigo[500]}}>
                <Typography sx={{fontFamily: "system-ui"}}>Search</Typography>
            </Button>
        </Paper>
    </>
    )
}

export default BannerContents