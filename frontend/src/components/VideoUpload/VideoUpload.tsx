import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { v4 } from 'uuid'
import { VideoInfoType } from '../../types/types';
import { Box,Grid,TextField,Button,Alert } from '@mui/material';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';
import { Upload } from '@mui/icons-material';


const boxStyle = {
    position:'absolute',
    background:'#FFFFFF',
    top:'18%',
    left:'25%',
    width:'50%',
    minHeight:'550px',
    borderRadius:'8px',
    padding:'2%',
    boxShadow:' rgba(0, 0, 0, 0.35) 0px 5px 15px',
}
const alertStyle = {
    marginBottom:'2%',
    fontFamily:'Segoe UI'
}
const Wrapper = styled.div`
  .react-datepicker {
    box-shadow: 3px 2px 11px rgb(0 0 0 / 30%);
  }
  .react-datepicker__input-container input {
    width:100%;
    height:60px;
    padding:2%;
    font-familty:'Segoe UI';
  }
`

const VideoUpload=()=> {
  const [video,setVideo] = useState<File|any>()
  const [videoInformation,setVideoInformation] = useState<VideoInfoType>({
    name:'',
    description:'',
    date:new Date(),
    url:''
  })
  const [uploaded,setUploaded] = useState<boolean>(false)
  
  useEffect(()=>{console.log(videoInformation)},[videoInformation])
  const onSubmit = () => {
    if(videoInformation.name.length!==0&&videoInformation.description.length!==0&&video){
    const data = new FormData();
    data.append("name", v4());
    data.append("video", video);

    axios.post("http://localhost:5000/upload-video", data)
      .then((res) => {axios.post("http://localhost:5000/upload-video-details",{...videoInformation,url:res.data})})
      .then(()=>{
        setVideoInformation({
        name:'',
        description:'',
        date:new Date(),
        url:''
      })
      setUploaded(!uploaded)
      setVideo(undefined)
    })
      .catch(err => console.log(err));
        
    }else{
        alert('Please fill all required fields')
    }
  };

  return (

    <Box sx={boxStyle} component="form">
        {uploaded&&<Alert sx={alertStyle} onClose={() => setUploaded(!uploaded)}> Video added successfully</Alert>}
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextField required value={videoInformation.name} fullWidth variant="outlined" label="video name" sx={{background:'white',
                 borderRadius:'4px'}}
                 onChange={(e)=>setVideoInformation({...videoInformation,name:e.target.value})}/>
            </Grid>
            <Grid item xs={12}>
                <TextField required value={videoInformation.description} fullWidth variant="outlined" label="video description"
                multiline rows={2}
                 sx={{background:'white',borderRadius:'4px'}}
                 onChange={(e)=>setVideoInformation({...videoInformation,description:e.target.value})}/>
            </Grid>
            <Grid item xs={12}>
                <Wrapper>
                    <DatePicker required  id="videoDate" selected={videoInformation.date}
                    onChange={(date:Date) => setVideoInformation({...videoInformation,date:date})} />
                </Wrapper>     
            </Grid>
            <Grid item xs={4}>
                <label htmlFor="file-upload" 
                style={{background:'#9C27B0',borderRadius:'4px',
                color:'white',fontFamily:'Segoe UI',padding:'15px',cursor:'pointer'}}>
                    Pick video
                </label>
                <input id="file-upload" required
                accept="video/*"
                 style={{display:'none'}} type="file" onChange={(e)=>{
                        const videoFile:File = e.target.files![0]
                        console.log(videoFile.type)
                        setVideo(videoFile)}}/>
            </Grid>
            <Grid item xs={8}>
                {video?<video style={{borderRadius:'8px'}} width="100%" height="160px" controls>
                 <source src={URL.createObjectURL(video)}/>
                 </video>:<video width="280px" height="160px"></video>}
            </Grid>
            <Grid item xs={12}>
                <Button onClick={onSubmit} fullWidth variant="contained" color="primary">Upload</Button>
            </Grid>
        </Grid>
    </Box>
  );
}

export default VideoUpload;
