import React, { useState } from 'react'
import { UserContext } from '../utils/Context'
import { useContext } from 'react'
import { Link } from 'react-router-dom';


//subcomponent for my channels page..
function IndividualChannel({data, setChannelData}) {
  
  let [editMode, setEditMode] = useState(false);
  let [uploadMode, setUploadMode] = useState(false);
  let [editName, setEditName] = useState('');
  let [editBanner, setEditBanner] = useState('');
  let [editTags, setEditTags] = useState('');
  let [editDescription, setEditDescription] = useState('');
  let [uploadVideoTitle, setUploadVideoTitle] = useState('');
  let [uploadVideoDescription, setUploadVideoDescription] = useState('');
  let [uploadVideoUrl, setUploadVideoUrl] = useState('');
  let [uploadVideoTags, setUploadVideoTags] = useState('');

  let [videoSectionOpem, setVideoSectionOpem] = useState(false);

  let {user,token} = useContext(UserContext);
//request function to server when edit a channel name or uploading a video or deleting as such..
  async function SaverOfVideoAndNames(id,actionType){
    try {
      let sendToServer;
      if(actionType == 'edit channel_video'){
        
        if(editMode){
          sendToServer = {
            meta: 'edit channel',
              editDescription, editName, editBanner, editTags, channelId:id
            }
        }
        else if(uploadMode){
          sendToServer = {
              meta : 'publish video',
              uploadVideoTitle, uploadVideoDescription, uploadVideoUrl, uploadVideoTags ,channelId:id
            }
        }
      }
      else if(actionType == 'delete video'){
        
          sendToServer = {
              meta : 'delete video',
             userId : user.email,
            videoId:id,
            token,user
            }
        }
      else if(actionType == 'delete channel'){
        sendToServer = {
          meta : 'delete channel',
          userId : user.email,
          channelId :id,
          token
        }
      }
    
        let reqToServer = await fetch('http://localhost:8086/channel',{
                              method: 'PATCH',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({sendToServer,token})
                          });
        let response = await reqToServer.json();
        setChannelData(response?.updatedChannels);
        setEditName('');
        setEditBanner('');
        setEditTags('');
        setEditDescription('');
        setUploadVideoTitle('');
        setUploadVideoDescription('');                 
        setUploadVideoUrl('');
        setUploadVideoTags('');
            
    } catch (error) {
        console.log(error)
    }
        

        
    }
    
    

  




  return (
    <div className='flex flex-col w-[90%]  m-2'>
    <img src={data.channelBanner} alt="" className='w-full h-[15vh]'/>
    <div className='flex justify-evenly items-center flex-wrap'>
      <div>
            <h1 className='text-4xl font-bold font-serif'>{data.channelTitle} </h1> 
            <p className='text-xl text-neutral-400'>{data.OwnerID}</p>

            <p className='text-xl'>{data.channelDescription}</p>
            <p className='text-lg bg-red-400 text-white p-2 rounded-2xl'> SUBSCRIBERS : {data.subscribersCount}</p>
      </div>
      {/* buttons for edit delete of channel and upload of video */}
      <div className='flex flex-col '>
        <button className='p-1 m-1 border rounded-2xl hover:bg-gray-700' onClick={()=>{setEditMode(!editMode);setUploadMode(false)}}>{editMode? `CANCEL` : `EDIT CHANNEL`}</button>
        <button className='p-1 m-1 border rounded-2xl hover:bg-gray-700' onClick={()=>{setUploadMode(!uploadMode);setEditMode(false)}}>PUBLISH VIDEO</button>
        <button className='p-1 m-1 border rounded-2xl hover:bg-gray-700' onClick={()=>{setUploadMode(false);setEditMode(false);SaverOfVideoAndNames(data?.channelId,'delete channel')}}>DELETE CHANNEL</button>
      </div>
      {/* forms for video upload channel edit and so on */}
      <div className='flex flex-col w-1/2 m-3 justify-evenly gap-2 '>
        {uploadMode && <h1 className='text-red-600 underline underline-offset-8'>** All Feilds Are Mandatory To Be Filled..</h1>}
        {editMode &&  <input value={editName} onChange={(e)=>setEditName(e.target.value)} className="p-2 rounded-2xl bg-neutral-400 w-full h-1/2 text-black"  type="text" placeholder='ENTER NEW NAME OF CHANNEL' />}
        {editMode && <input value={editBanner} onChange={(e)=>setEditBanner(e.target.value)} className="p-2 rounded-2xl bg-neutral-400 w-full h-1/2 text-black"  type="text" placeholder='ENTER NEW BANNER IMAGE OF CHANNEL'/>}
        {editMode &&  <input value={editDescription} onChange={(e)=>setEditDescription(e.target.value)} className="p-2 rounded-2xl bg-neutral-400 w-full h-1/2 text-black"  type="text" placeholder='ENTER NEW TAGS OF CHANNEL' />}
        {editMode &&  <input value={editTags} onChange={(e)=>setEditTags(e.target.value)} className="p-2 rounded-2xl bg-neutral-400 w-full h-1/2 text-black"  type="text" placeholder='ENTER NEW DESCRIPTION OF CHANNEL'/>}
        {uploadMode &&  <input value={uploadVideoTitle} onChange={(e)=>setUploadVideoTitle(e.target.value)} className="p-2 rounded-2xl bg-neutral-400 w-full h-1/2 text-black"  type="text" placeholder='ENTER VIDEO TITLE' />}
        {uploadMode &&  <input value={uploadVideoDescription} onChange={(e)=>setUploadVideoDescription(e.target.value)} className="p-2 rounded-2xl bg-neutral-400 w-full h-1/2 text-black"  type="text" placeholder='ENTER DESCRIPTION FOR THE VIDEO' />}
        {uploadMode &&  <input value={uploadVideoTags} onChange={(e)=>setUploadVideoTags(e.target.value)} className="p-2 rounded-2xl bg-neutral-400 w-full h-1/2 text-black"  type="text"  placeholder='ENTER VIDEO URL'/>}
        {uploadMode &&  <input value={uploadVideoUrl} onChange={(e)=>setUploadVideoUrl(e.target.value)} className="p-2 rounded-2xl bg-neutral-400 w-full h-1/2 text-black"  type="text" placeholder='ENTER TAGS BY WHICH PEOPLE SEACH FOR YOUR VIDEO'/>}
        {(editMode|| uploadMode) && ( <section className='flex'>
              <button onClick={()=>SaverOfVideoAndNames(data?.channelId,'edit channel_video')} className='p-1 m-1 border rounded-xl bg-green-500 text-black font-bold'>SAVE</button>
              <button onClick={()=>{setEditMode(false);setUploadMode(false)}} className='p-1 m-1 border rounded-xl w-fit bg-red-600 text-shadow-white font-bold'>CANCEL</button>
            </section>)}
      </div>

    </div>
    {/* mapping videos of each channels */}
   <h1>Channel Videos : </h1>{data?.videos.length<=0 && <h1 className='text-center'> No Videos Are Available for this Channel..</h1>}
    <div>{data.videos.map((items, index)=>
                                                  <div key={index} className="w-full object-contain h-3/5  max-w-full flex justify-center   duration-300 items-center bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow  m-2 mb-4  ">
                                                    <Link to={`/video/${items.videoId}`} className='flex justify-center items-center'>
                                                      <div className='flex flex-col h-2/3'>
                                                        <img src={items.videoThumbnail} alt="" className=" object-center w-1/2 h-1/2 rounded-t-2xl"/>
                                                        <section className="flex gap-[10%] items-center justify-around text-neutral-300 mt-1 pb-1 text-sm w-1/2 h-1/2">
                                                            <p className='p-2 flex flex-col  border-b rounded-2xl'>  Likes <i className="fa-solid fa-thumbs-up pb-1"></i>{items?.likes}</p>
                                                            <p className='p-2 flex flex-col  border-b rounded-2xl'>Views  <i className="fa-solid fa-eye pb-1"></i>{items?.views} </p>
                                                            <p className='p-2 flex flex-col  border-b rounded-2xl'>Dislikes  <i className="fa-solid fa-thumbs-down pb-1"></i>{items?.dislikes} </p>

                                                        </section>
                                                      </div>
                                                      
                                                      <div className='w-1/3 h-full flex flex-col '>
                                                        <h2 className="text-md font-semibold text-white m-1 p-2">Video Description:  {items?.videoDescription}</h2>
                                                        <p className="text-sm font-semibold text-neutral-400 p-1 m-1 ">Video Title:  {items?.videoTitle}</p>
                                                        <p className="text-sm font-semibold text-neutral-400 p-1 m-1 ">Video Channel ID:  {items?.channelId}</p>
                                                        <p className="text-sm font-semibold text-neutral-400 p-1 m-1 ">Video Created on :  {items?.createdOn}</p>
                                                        <hr />
                                                      </div> 
                                                      </Link>   
                                                      <button onClick={()=>{setEditMode(false); setUploadMode(false) ;SaverOfVideoAndNames(items?.videoId,'delete video')}} className='p-2 m-2 rounded-2xl border bg-red-400 text-black'>DELETE VIDEO</button>  
                                                  </div>
                                                  )}
                                                                                                              


    </div>
      <hr /><br /><hr />
    </div>
  )
}

export default IndividualChannel





