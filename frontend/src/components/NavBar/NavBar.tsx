import React from 'react'
import styled from 'styled-components'
import { IconButton } from '@mui/material'
import { Collections, CloudUpload } from '@mui/icons-material'
import { useNavigate } from 'react-router'

const TopBar = styled.div`
    display:flex;
    flex-direction:row;
    justify-contenct:left;
    align-items:center;
    background:#02838E;
    width:100%;
    height:100px;
    margin:0;
    padding:30px;
`
const iconStyle = {
    fontSize:40,
    margin:2
}
export default function NavBar() {
    const navigate = useNavigate()

    const navigateToGallary = ()=>navigate('/')
    const navigateToUpload = ()=>navigate('/video-upload')
  return (
    <TopBar>
        <IconButton onClick={navigateToGallary}>
            <Collections sx={iconStyle} color="action"/>
        </IconButton>

        <IconButton onClick={navigateToUpload}>
            <CloudUpload sx={iconStyle} color="action"/>
        </IconButton>
    </TopBar>
  )
}
