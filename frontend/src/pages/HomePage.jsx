
import React, { useContext } from 'react'

import Navbar from '../components/Navbar'
import { Box,  Typography } from '@mui/material'
import AuthContext from '../context/AuthContext'
import Banner from '../components/Banner'

const HomePage = () => {

    let {user} = useContext(AuthContext)

    return (
        <Box>
            <Navbar/>
            {/* <Typography>HomePage</Typography> */}
            <Banner></Banner>
            {user ? <p>Hello {user.username}</p> : <p>Not Logged In</p>}
        </Box>
    )
}

export default HomePage