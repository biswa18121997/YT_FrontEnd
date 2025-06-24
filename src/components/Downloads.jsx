import React from 'react'
import { useState,useEffect,useContext } from 'react'
import {UserContext} from '../utils/Context';
import { Link } from 'react-router-dom';

//downloads page..
function Downloads() {
  let [downloads, setDownloads] = useState({});
  let {token, user} = useContext(UserContext);

  useEffect(()=>{

    fetchDownloads();
  },[token,user])
//fetching download data from profile..in db
  async function fetchDownloads() {
    try {
      let sendToServer = {token, user}
      let reqToServer = await fetch(`http://localhost:8086/downloads`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sendToServer)
            })
            let response = await reqToServer.json();
            setDownloads(response);       
    } catch (error) {
      console.log(error)
    }
    
  }//mapping the data of downloads into cards..
  return (
    <div className='md:w-[85vw] w-full relative left-[10vw] h-full  top-[15vh] text-white rounded-4xl'><h1 className='text-center text-2xl font-bold mb-3 sticky top-[10vh] bg-neutral-700'>Your Downloaded Videos</h1>
      {downloads?.searchProfile?.downloaded?.map((items, index)=><Link to={`/video/${items?.videoId}`} key={index}>
      <div className='w-full h-[25vh] overflow-y-scroll border rounded-4xl flex-col md:flex-row flex gap-4 mb-5 scroll-smooth'>
      <img src={items?.videoThumbnail} alt="" className='rounded-4xl md:w-1/2 w-[80%]' />
      <div className='flex flex-col gap-2'>
        <p className='text-lg font-semibold'>Video Title :  {items?.videoTitle}</p><hr />
        <p className='text-sm'> Video Description : {items?.videoDescription}</p><hr />
        <p> Video ID : {items?.videoId}</p>
      </div>
      
      </div></Link>)}
      

</div>
  )
}

export default Downloads
