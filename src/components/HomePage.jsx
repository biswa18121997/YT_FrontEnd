import { Link } from "react-router-dom"
import { useFetch } from "../utils/Fetch.js"
import VideoPreviewCard from "./VideoPreviewCard.jsx";
import FetchLocal from "../utils/FetchLocal.js";
import {UserContext} from '../utils/Context.jsx';
import { useContext } from 'react';
import { useState } from "react";
import { useEffect } from "react";
//home page...
export default function HomePage(){
    let [display, setDisplay] = useState({})
    let [filter, setFilter] =useState('Trending on Youtube');
    // API keys
const API_KEY_2 = 'AIzaSyANrQ1rFYCVFXKpLcuqYnQ7yLuzOcxbMy8';
const API_KEY = 'AIzaSyCLfNg8E42zJZF5obZA-5e4AboR5YzKRFY'  
   let {user,token} = useContext(UserContext);
   

   
// videos based on filter selected
    let url='';
            if(filter == 'Trending on Youtube')
                url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&chart=mostPopular&regionCode=IN&maxResults=20&key=${API_KEY}`
            else if(filter == 'Action')
                        url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=Action&type=video&videoCategoryId=24&maxResults=15&key=${API_KEY}`
            else if(filter == 'Adventure')
                url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=Adventure&type=video&videoCategoryId=24&maxResults=15&key=${API_KEY}`

            else if(filter == 'Movies')
                url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=latest_movies&type=video&videoCategoryId=24&maxResults=15&order=viewCount&regionCode=IN&key=${API_KEY}`
            

            let {data,error,loading} = useFetch(url);

    return(<div className="w-[85vw] relative left-[12vw] h-screen top-[20vh] sm:top-[15vh] md:top-[15vh]">
        {/* filters */}
        <section className="flex justify-around z-10 sticky p-2 pt-2 bg-neutral-500/50 top-[20vh] sm:top-[16vh] md:top-[12vh] overflow-x-scroll sm:overflow-x-scroll h-[5.5vh] overflow-hidden md:overflow-visible items-center hover:cursor-pointer">
            <p onClick={()=>setFilter('Trending on Youtube')} className={`${filter === 'Trending on Youtube' ? 'bg-red-500' : 'bg-black'} p-2 m-1 border rounded-2xl text-nowrap`}>YT Trends</p>
            <p onClick={()=>setFilter('Action')} className={`${filter === 'Action' ? 'bg-red-500' : 'bg-black'} p-2 m-1 border rounded-2xl`}>Action</p>
            <p onClick={()=>setFilter('Adventure')} className={`${filter === 'Adventure' ? 'bg-red-500' : 'bg-black'} p-2 m-1 border rounded-2xl`}>Adventure</p>
            <p onClick={()=>setFilter('Movies')} className={`${filter === 'Movies' ? 'bg-red-500' : 'bg-black'} p-2 m-1 border rounded-2xl`}>Movies/Entertainment</p>
        </section>
        <br />
        {/* if no validtoken in local storage then show login and register card */}
       {!localStorage.getItem('userAuth') &&  <div className="flex flex-col justify-center items-center h-1/2 ">

      <div className="flex rounded-2xl flex-col justify-center items-center border p-4 m-4">
            <h1>Please Login or / Register to view more personalied content..</h1>
            <i className="fa-solid fa-user border-2 p-2 m-2 rounded-2xl text-3xl"></i>
            <Link to={'/login'}>
                 <button className="p-2 m-2 border rounded-2xl"> Log In</button>
            </Link>
            <Link to={'/register'}>
                <button className="p-2  border rounded-2xl"> Register</button>
            </Link>
            
        </div>
        
        
        </div>}
        <h1 className="text-center">Trending</h1>
        <hr />
        <div className="grid grid-cols-1 grid-rows-1 sm:grid-cols-2 sm:grid-rows-2  md:grid-cols-3 md:grid-rows-3 w-full gap-2">
            {/* video cards apping based on filter */}
            {data?.items?.map((item, index)=> <VideoPreviewCard item={item} key={index} />)}
        
        
        </div>
        <div>
            
        </div>
        
        </div>)
}


// yt api key=   AIzaSyCLfNg8E42zJZF5obZA-5e4AboR5YzKRFY