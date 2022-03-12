import React from 'react';
import ReactDOM from 'react-dom';
import VideoGallary from './components/VideosGallary/VideoGallary';
import VideoUpload from './components/VideoUpload/VideoUpload';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<VideoGallary />}/>
        <Route path="video-upload" element={<VideoUpload />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
