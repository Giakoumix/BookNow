
import React, {useState, useEffect} from 'react'

import {Grid, Typography, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material'
import Switch from '@mui/material/Switch'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Navbar from '../components/Navbar'
import AdminTable from '../components/admin/AdminTable'
// import HostAwaitingTable from '../components/admin/HostAwaitingTable'
// import AdminSideBar from '../components/admin/AdminSideBar'
// import AdminDataDisplay from '../components/admin/AdminDataDisplay'

import Home from '@mui/icons-material/Home'
import AdminHostsAwaiting from '../components/admin/AdminHostsAwaiting';
import AdminHosts from '../components/admin/AdminHosts';
// import { Typography } from 'antd'

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

const AdminPage = () => {

    const options = ["Home", "Hosts", "Accomodations"];
    // const [buttons, setButtons] = useState([true, false, false])
    const [button, setButton] = useState(0)
    const [result, setResult] = useState([])
    const buttonOptions = {0: "auth/get_all_hosts_awaiting", 1: "auth/get_all_hosts", 2: "Accomodations"}

    useEffect(() => {
        switch (button) {
            case 0:
                get_hosts_awaiting()
                break;
            case 1:
                get_hosts()
        }
        
    }, [button])

    let get_results = async (index) => {
        let url = 'http://127.0.0.1:8000/' + buttonOptions[index]

        let response = await fetch(url)
        console.log('hello')
        let data = await response.json()
        console.log('Data', data)
        setResult(data)
    }

    let get_hosts_awaiting = async () => {
        let response = await fetch(`http://127.0.0.1:8000/auth/get_all_hosts_awaiting`)
        let data = await response.json()

        setResult(data)
        console.log(result)
    }

    let get_hosts = async () => {
        let response = await fetch(`http://127.0.0.1:8000/auth/get_all_hosts`)
        let data = await response.json()
        // console.log('Data profiles', data.profiles)
        let user_profile_host = []
        console.log('user profile host', user_profile_host)

        for (let i = 0 ; i < data.users.length ; i++) {
            user_profile_host.push({...data.users[i], ...data.profiles[i], ...data.hosts[i]})
        }
        setResult(user_profile_host)
        console.log(result)
    }

    // console.log(options)
    // console.log(buttons) 
    // console.log(result)
    if (result === null) {
        return <Typography>Loading...</Typography>
    }

    return (
        <>
        <Navbar></Navbar>
        <Grid container>
            <Grid item xs={2}>
                {/* <AdminSideBar options={options} buttons={buttons}></AdminSideBar> */}
                <Box  flex={1} p={2} sx={{display: {xs: "none", sm: "block"}, pt: '10%'}}>
                    <Box position="fixed">
                    <List>
                        <ListItem disablePadding sx={{pt: '15px'}}>
                            <ListItemButton onClick={() => setButton(0)}>
                                <ListItemIcon>
                                    <Home></Home>
                                </ListItemIcon>
                                <ListItemText primary="Home Page"/>
                            </ListItemButton>
                        </ListItem> 
                        <ListItem disablePadding sx={{pt: '15px'}}>
                            <ListItemButton onClick={() => setButton(1)}>
                                <ListItemIcon>
                                    <Home></Home>
                                </ListItemIcon>
                                <ListItemText primary="Hosts"/>
                            </ListItemButton>
                        </ListItem> 
                        <ListItem disablePadding sx={{pt: '15px'}}>
                            <ListItemButton >
                                <ListItemIcon>
                                    <Home></Home>
                                </ListItemIcon>
                                <ListItemText primary="Accomodations"/>
                            </ListItemButton>
                        </ListItem> 
                    </List>
                    </Box>
                </Box>
            </Grid>

            <Grid item xs={10}>
                <Grid container direction='column'>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={8} sx={{pt: '4%', width: '90%'}}>
                        {console.log('The result down is: ', result)}
                        {button === 0 ? 
                        <AdminHostsAwaiting result={result} ></AdminHostsAwaiting>
                        : undefined}
                        {button === 1 ? 
                        <AdminHosts result={result}></AdminHosts>
                        : undefined}

                    </Grid>
                </Grid>
                
                
            </Grid>
        </Grid>
        {/* Hello admin */}
        </>
    )
}

export default AdminPage