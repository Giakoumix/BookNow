
import React, { useState } from 'react'

import {Button} from '@mui/material'
import MapSelection from './MapSelection'
import { GoogleComponent } from 'react-google-location'

const Accomodations = () => {

    const [button, setButton] = useState(false)

    return (
        <>
            {button ? <>
                <GoogleComponent></GoogleComponent>
            </> 
            : 
            <>
                <Button variant="contained" onClick={() => setButton(true)}>Create Accomodation</Button>
            </> 
            }
        </>

    )
}

export default Accomodations