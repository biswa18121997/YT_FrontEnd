import React from 'react'
import { useEffect, useContext, useState } from 'react'
import {useParams, Link} from 'react-router-dom'
import { UserContext } from '../utils/Context';
// individual channels page( not my channels page)
function ChannelsPage() {
    let {user, token} = useContext(UserContext);
    let [res, setRes] = useState({});
    let params = useParams();
    //asking the server for data of the channel
    async function getChannelsPage() {
            let sendToServer = {
                channelId : params.id,
                token
            }
            let reqToServer =await fetch(`http://localhost:8086/channels/${params.id}`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sendToServer)
            });
            let response = await reqToServer.json();
            setRes(response)  
    }
    useEffect(()=>{
        getChannelsPage();
    },[params.id])
  return (
    <div className='w-[85vw] relative left-[10vw] h-full  top-[15vh]'>
        <div className='flex flex-col  h-full'>
            <img className='w-full h-[20vh] object-fill' src={res?.channel?.[0]?.channelBanner} alt="" />
            <div className='flex m-5 justify-start border rounded-2xl p-4 '>
                <img className='w-1/12 h-1/12 rounded-full' src={res?.channel?.[0]?.channelBanner} alt='' />
                <section className='m-5'>
                    <h1>{res?.channel?.[0]?.channelTitle}</h1>
                    <h1>{res?.channel?.[0]?.channelDescription}</h1>
                    <h1>Creator ID : {res?.channel?.[0]?.OwnerID}</h1>
                    <h1 className='p-2 m-2 bg-red-500 text-white rounded-4xl w-fit'>Subscribers : {res?.channel?.[0]?.subscribersCount}</h1>

                </section>
            </div>
        </div>
        {/* mapping videos of published by the channel */}
       <h1 className='text-center underline m-4'>VIDEOS BY THIS CHANNEL :</h1>
        <div className='flex flex-col'>
            {res?.videos?.map((item,index)=><div key={index} className=" m-2 rounded-3xl justify-start items-center border  h-[20vh]  flex">
              <img src={item.videoThumbnail} alt='THUMBNAIL' className="w-1/2 h-full"/>
              <div className="ml-4">
                <h3 className='text-wrap'><strong> {item.videoTitle}</strong></h3>
                <h3> {res?.channel?.[0]?.channelTitle}</h3>
                <h3> <i className="fa-solid fa-clock"></i> :  {item.publishedAt}</h3>
              </div>
          </div>)}
        </div>
    </div>
  )
}

export default ChannelsPage
