
import React from 'react'

import {Grid, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material'
import Switch from '@mui/material/Switch'


import Home from '@mui/icons-material/Home'
import Settings from '@mui/icons-material/Settings'
import Pages from '@mui/icons-material/Pages'
import StorefrontIcon from '@mui/icons-material/Storefront';
import DarkModeIcon from '@mui/icons-material/DarkMode';


const AdminSideBar = (  {options, buttons}  ) => {
    console.log('Our options are', options)

    let setButton = (index) => {
        buttons.map((button, indx) => {
            if (index === indx) {
                buttons[indx] = true
            } 
            else {
                buttons[indx] = false
            }
        })
        console.log(buttons)
    }

    return (
        <>
        <Box  flex={1} p={2} sx={{display: {xs: "none", sm: "block"}, pt: '10%'}}>
            <Box position="fixed">
            <List>
                {options.map((option, index) => (
                    <ListItem disablePadding sx={{pt: '15px'}}>
                    <ListItemButton onClick={() => setButton(index)}>
                        <ListItemIcon>
                            <Home></Home>
                        </ListItemIcon>
                        <ListItemText primary={option} />
                    </ListItemButton>
                </ListItem>
                )) }
            </List>
        
            </Box>
        </Box>
        </>
    )
}

export default AdminSideBar