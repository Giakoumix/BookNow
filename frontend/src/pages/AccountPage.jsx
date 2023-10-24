
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'

import {Grid, Paper, Box} from '@mui/material'

import Navbar from '../components/Navbar'
import Tenant from '../components/profile/Tenant'
import Host from '../components/profile/Host'
import createPalette from '@mui/material/styles/createPalette'

const AccountPage = () => {
    
    let {user} = useContext(AuthContext)
    console.log()
    const [profile, setProfile] = useState({})
    const [host, setHost] = useState({})
    const [tenant, setTenant] = useState({})

    useEffect(() => {
        initialize()
    }, [])

    let initialize = async () => {
        let response = await fetch(`http://127.0.0.1:8000/auth/get_profile_by_user/${user.user_id}`) 
        let profile = await response.json()
        setProfile(profile)

        if (profile.permissions === "T") {
            response = await fetch(`http://127.0.0.1:8000/auth/get_tenant_by_user/${user.user_id}`)
            let tenant = await response.json()
            setTenant(tenant)
        }
        else if (profile.permissions === "H") {
            response = await fetch(`http://127.0.0.1:8000/auth/get_host_by_user/${user.user_id}`)
            let host = await response.json()

            setHost(host)
        }
        else {
            response = await fetch(`http://127.0.0.1:8000/auth/get_host_by_user/${user.user_id}`)
            let host = await response.json()
            setHost(host)
            response = await fetch(`http://127.0.0.1:8000/auth/get_tenant_by_user/${user.user_id}`)
            let tenant = await response.json()
            setTenant(tenant)
        }
    } 

    return (
        <>
            <Navbar/>
            {/* <Grid container>
                <Grid item xs={4}></Grid>
                <Grid item xs={4} sx={{display: 'flex', justifyContent: 'center'}}>
                    <p>Hello {user.username}</p>
                </Grid>
                <Grid item xs={4}></Grid>
            </Grid> */}
            {console.log(profile.permissions)}
            {profile.permissions === "T" ? 
                <Tenant user={user} profile={profile} tenant={tenant}></Tenant> 
            : 
                <Host user={user} profile={profile} host={host}></Host>
            }
            
        </>
    )
}

export default AccountPage