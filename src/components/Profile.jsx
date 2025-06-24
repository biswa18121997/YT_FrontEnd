import React from 'react'
import { useEffect,useContext } from 'react'
import {UserContext} from '../utils/Context.jsx'
import { useState } from 'react';
import VideoPreviewCard from './VideoPreviewCard.jsx'
import {Link} from 'react-router-dom'

//profile page componenet..
export default function Profile() {
  let [profileData, setProfileData] = useState({});
  let {user, profile, token} = useContext(UserContext);
  //requesting server to send profile details..
  async function fetchProfileDetails() {
    try {
      let sendToServer = {token, user, profile}
      let reqToServer = await fetch(`http://localhost:8086/profile`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sendToServer)
            })
            let response = await reqToServer.json();
            setProfileData(response);
    } catch (error) {
      console.log(error)
    } 
  }
  useEffect(()=>{
      fetchProfileDetails();
  },[user,token,profile])
  return (
    <div className="w-[85vw] relative left-[12vw] h-fit m-2 p-2 top-[12vh]">
        <div className='flex bg-center bg-[url("https://i.pinimg.com/736x/a1/6a/5d/a16a5d9a952874e51fe0d56951c5d19f.jpg")]'>
            <img className="w-[20vw] h-[25vh] " src="https://static.vecteezy.com/system/resources/previews/045/711/185/non_2x/male-profile-picture-placeholder-for-social-media-forum-dating-site-chat-operator-design-social-profile-template-default-avatar-icon-flat-style-free-vector.jpg" alt="" />
            <div className="flex flex-col p-2 m-4 text-yellow-400  w-full justify-center bg-black/80">
                <h1 className='text-3xl'>{profileData?.profileData?.name}</h1>
                <h2 className='text-gray-300'>{profileData?.profileData?.email} </h2>
                <div className='text-white'>
                    <button className="p-2 m-1 border rounded-2xl">Customize Channel</button>
                    <button className="p-2 m-1 border rounded-2xl"> Manage Videos </button>
                </div>
            </div>
        </div><br />
        
<hr />
        <h1 className='mt-3'>DOWNLOADS:</h1><br />
        <div className='min-h-[20vh]'>
          {profileData?.profileData?.downloaded?.map((items, index)=><Link to={`/video/${items.videoId}`} key={index}>{!profileData?.profileData?.history.length>0 && <h1 className='text-center border-t border-b p-2 '><i className="fa-solid fa-circle-exclamation"> </i> No Downloaded Videos To Display</h1>}

                                                  <div className=" w-full md:w-2/3 object-contain h-fit  max-w-full flex  duration-300 items-center bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow  m-2   ">
                                                      <div className='flex flex-col h-2/3'>
                                                        <img src={items.videoThumbnail} alt="" className=" object-center h-full rounded-t-2xl"/>
                                                        <section className="flex gap-[10%] items-center justify-around text-neutral-300 mt-1 pb-1 text-sm">
                                                            <p className='p-2 flex flex-col  border-b rounded-2xl'>  Likes <i className="fa-solid fa-thumbs-up pb-1"></i>{items?.likes}</p>
                                                            <p className='p-2 flex flex-col  border-b rounded-2xl'>Views  <i className="fa-solid fa-eye pb-1"></i>{items?.dislikes} </p>
                                                        </section>
                                                      </div>
                                                      
                                                      <div className='w-1/3 h-full flex flex-col '>
                                                        <h2 className="text-md font-semibold text-white m-1 p-2">{items?.videoDescription.slice(0,40)}</h2>
                                                        <p className="text-sm font-semibold text-neutral-400 p-1 m-1 ">{items?.videoTitle}</p><hr />
                                                      </div>                                                                    
                                                  </div>
                                                  </Link>)}
          {profileData?.profileData?.downloaded.length==0 && <h1 className='text-center border-t border-b p-2 '><i className="fa-solid fa-circle-exclamation"> </i> No Downloaded Videos To Display</h1>}

        </div>
        <hr />
        <h1>HISTORY / PREVIOUSLY WATCHED</h1>
        <div className='flex flex-col-reverse'>
          {profileData?.profileData?.history?.slice(0,25).map((items, index)=> <Link to={`/video/${items.videoId}`} key={index} >{!profileData?.profileData?.history.length>0 && <h1 className='text-center border-t border-b p-2 '><i className="fa-solid fa-circle-exclamation"> </i> No Downloaded Videos To Display</h1>}

                                                  <div className=" w-full md:w-2/3 object-contain h-fit  max-w-full flex  duration-300 items-center bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow  m-2   ">
                                                      <div className='flex flex-col h-2/3'>
                                                        <img src={items.videoThumbnail} alt="" className=" object-center h-full rounded-t-2xl"/>
                                                        <section className="flex gap-[10%] items-center justify-around text-neutral-300 mt-1 pb-1 text-sm">
                                                            <p className='p-2 flex flex-col  border-b rounded-2xl'>  Likes <i className="fa-solid fa-thumbs-up pb-1"></i>{items?.likes}</p>
                                                            <p className='p-2 flex flex-col  border-b rounded-2xl'>Views  <i className="fa-solid fa-eye pb-1"></i>{items?.dislikes} </p>
                                                        </section>
                                                      </div>
                                                      
                                                      <div className='w-1/3 h-full flex flex-col '>
                                                        <h2 className="text-md font-semibold text-white m-1 p-2">{items?.videoDescription.slice(0,40)}</h2>
                                                        <p className="text-sm font-semibold text-neutral-400 p-1 m-1 ">{items?.videoTitle}</p><hr />
                                                      </div>                                                                    
                                                  </div>
                                                  </Link>)}
        </div>
        <hr />
        <h1>RECENTLY LIKED VIDEOS :</h1>
        <div>
          {profileData?.profileData?.recentlyLikedVideos?.map((items, index)=> <Link to={`/video/${items.videoId}`} key={index} >{!profileData?.profileData?.recentlyLikedVideos.length>0 && <h1 className='text-center border-t border-b p-2 '><i class="fa-solid fa-circle-exclamation"> </i> No Downloaded Videos To Display</h1>}
                                                  <div className="w-2/3 object-contain h-fit  max-w-full flex  duration-300 items-center bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow  m-2   ">
                                                      <div className='flex flex-col h-2/3'>
                                                        <img src={items.videoThumbnail} alt="" className=" object-center h-full rounded-t-2xl"/>
                                                        <section className="flex gap-[10%] items-center justify-around text-neutral-300 mt-1 pb-1 text-sm">
                                                            <p className='p-2 flex flex-col  border-b rounded-2xl'>  Likes <i className="fa-solid fa-thumbs-up pb-1"></i>{items?.likes}</p>
                                                            <p className='p-2 flex flex-col  border-b rounded-2xl'>Views  <i className="fa-solid fa-eye pb-1"></i>{items?.dislikes} </p>
                                                        </section>
                                                      </div>
                                                      
                                                      <div className='w-1/3 h-full flex flex-col '>
                                                        <h2 className="text-md font-semibold text-white m-1 p-2">{items?.videoDescription.slice(0,40)}</h2>
                                                        <p className="text-sm font-semibold text-neutral-400 p-1 m-1 ">{items?.videoTitle}</p><hr />
                                                      </div>                                                                    
                                                  </div>
                                                  </Link>)}
        </div>
    </div>
  )
}


