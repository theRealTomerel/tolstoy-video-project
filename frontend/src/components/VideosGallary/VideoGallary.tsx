import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import { VideosInfoTypeStore } from '../../types/types';
import { motion, AnimatePresence } from "framer-motion"
import { IconButton} from '@mui/material';
import { ArrowCircleLeft, ArrowCircleRight } from '@mui/icons-material';
import ReactPlayer from 'react-player/lazy';
import axios from 'axios';

const VideoDiv = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    position:absolute;
    top:25%;
    width:100%;
`
const VideoDetailsDiv = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    width:60%;
    position:absolute;
    top:102%;
    left:20%;

    &>div>p{
        font-family:'Segoe UI';
        font-size:35px;
    }
`
const navArrowStyle = {
    fontSize:75,
    margin:10
}
const VideoGallary=()=> {
    const [videos,setVideos] = useState<VideosInfoTypeStore>([{
        name:'No videos yet',
        description:'Add videos on the uploads page to view on the gallary',
        date:new Date().toString(),
        url:''
      }])
    const [currentIndex,setCurrentIndex] = useState<number>(0)

      useEffect(()=>{
        let isApiSubscribed = true;
       
          if (isApiSubscribed) {
            axios.get('http://localhost:5000/get-videos')
            .then((res)=>{res.data.length!==0&&setVideos(res.data)})
            .catch((err) => console.log(err))
          }
    
        return () => {
          isApiSubscribed = false;
        }
      },[])


      const prevVideo = ()=>{
        currentIndex>0?
        setCurrentIndex(currentIndex-1)
        :setCurrentIndex(videos.length-1)
      }

      const nextVideo = ()=>{
        currentIndex<videos.length-1?
        setCurrentIndex(currentIndex+1)
        :setCurrentIndex(0)
      }

      const getParsedDate = ()=>{
          const date = new Date(videos[currentIndex].date)
          const parsedDate = date.getDay() +'/'+ date.getMonth() + '/' + date.getFullYear()
          return parsedDate  
      }
    return(
        <VideoDiv>
            <IconButton onClick={prevVideo}>
                <ArrowCircleLeft sx={navArrowStyle}/>
            </IconButton>
            
            <ReactPlayer controls={true} style={{borderRadius:'8px',
                background:'white',
                boxShadow:' 3px 2px 11px rgb(0 0 0 / 30%)'}} width="60%"
                height="500px" url={videos[currentIndex].url}
                stopOnUnmount={true}/>

            <IconButton onClick={nextVideo}>
                <ArrowCircleRight sx={navArrowStyle}/>
            </IconButton>
            <VideoDetailsDiv>
                <div style={{display:'flex',flexDirection:'column'}}>
                    <p>{videos[currentIndex].name}</p>
                    <p style={{fontSize:'15px',color:'gray'}}>{getParsedDate()}</p>
                </div>
                <div>
                    <p style={{color:'gray',fontSize:'20px'}}>{videos[currentIndex].description}</p>
                </div>
                
            </VideoDetailsDiv>
        </VideoDiv>
    )
    
}

export default VideoGallary;
