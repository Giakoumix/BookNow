
import React from 'react'
import {Box} from '@mui/material'

import {styled} from '@mui/material/styles'
import {indigo} from '@mui/material/colors'

import BannerContents from './BannerContents'

const BannerContainer = styled(Box) (() => ({ 
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
    width: '100%',
    height: '100%',
    padding: '20px 0px',
    background: indigo[500],
    borderRadius: '16px',
    boxShadow: '3',
}))

const BannerContent = styled(Box) (() => ({
    display: 'flex',
    justifyContent: 'left',
    flexDirection: 'column',
    padding: '30px'
}))

const Banner = () => {
    return (
        <BannerContainer>
            <BannerContent>
                <BannerContents></BannerContents>
            </BannerContent>
        </BannerContainer>
    )
}

export default Banner