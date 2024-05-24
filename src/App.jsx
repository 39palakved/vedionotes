
//import './App.css';
import { useState } from 'react'
import {AppContext} from "./contexts/contextApi";
import { BrowserRouter,Routes,Route,useNavigate } from 'react-router-dom';

import Feed from "./components/Feed"
import Header from './components/Header';
import LeftNav from './components/LeftNav'
import LeftNavMenuitem from './components/LeftNavMenuItem'
import SearchResult from './components/SearchResult'
import SearchResultVideoCard from './components/SearchResultVideoCard'
import Loggin from './components/Loggin'
import Siggnup from './components/Siggnup';
import VideoCard from './components/VideoCard'
import VideoDetails from './components/VideoDetails'

function App() {
  

 
  return (
    <AppContext>
     <BrowserRouter>
     <div className="flex flex-col h-full"></div>
  
     {/* <Header/> */}
     <Routes>
       
     <Route path="/" element={<Siggnup/>}/>
     
     <Route path="/Loggin" element={<Loggin/>}/>
     
      
      <Route path='/Loggin/:feed'  element={<Feed/>}/>
      <Route path='/searchResult/:searchQuery' element={<SearchResult/>}/>
      <Route path='/video/:id' element={<VideoDetails/>}/>
      <Route path='/video/:id' element={<VideoDetails/>}/>
      
      
     </Routes>
     </BrowserRouter>
      
    </AppContext>
  )
}

export default App

