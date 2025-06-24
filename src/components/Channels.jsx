import { useEffect, useState } from "react"
import { UserContext } from '../utils/Context.jsx';
import {useContext} from 'react'
import IndividualChannel from "./IndividualChannel.jsx";

//on channels page..

function Channels() {
    let [formVisible,setFormVisible] = useState(false);
    let [chName,setChName] = useState('');
    let [chTags,setChTags] = useState('');
    let [chDescription,setChDescription] = useState('');
    let [chBanner,setChBanner] = useState('');
    let {user,profile,token} = useContext(UserContext);
    let [channelData, setChannelData] = useState([]);
 //asking the server to send the details of a chaneel
    async function fetchChannels() {
        try {
            let dataSent = {token, user }
            let fetcher = await fetch('https://yt-backend-kjsa.onrender.com/channel',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({token, user} )
            });
            let dataChannels = await fetcher.json();
            setChannelData(dataChannels);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchChannels();
    },[])
  
//asking the server to create a new channel
    async function createChannel(e) {
        e.preventDefault();
        try {
            let dataSent = await fetch('https://yt-backend-kjsa.onrender.com/channel',{
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({token, user, chBanner, chDescription, chTags, chName})
            });
            let response = await dataSent.json();
            setChannelData(response?.channels);
            console.log(response);
            
        } catch (error) {
            console.log(error)
        }
    }
    
   
    

  return (<div className="w-[85vw] relative left-[10vw] h-fit m-2 p-2 top-[12vh]">
    <div className="flex p-4 m-4 border-t rounded-4xl w-full md:w-2/3 justify-start items-start">
    <img className="w-[10vw] h-[15vh] rounded-full object-center" src="data:image/jpeg;base64,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" alt="" />
    <div className="flex flex-col p-2 m-4 ">
        <h1 className="text-3xl font-bold"> {user.name}</h1>
        <h2>{user.email} </h2>
        <div>
            <h1 className="p-2 m-1  rounded-2xl">Customize Your Channel Here <i className="fa-regular fa-hand-point-down text-2xl"></i></h1>
            <h1 className="p-2 m-1  rounded-2xl">   <i className="fa-regular fa-hand-point-down text-2xl">  Manage Your Videos</i> </h1>
        </div>
    </div>


    </div>
    <div className="w-full relative h-[70vh] border overflow-y-scroll rounded-2xl border-t-0">
        <h1 className="sticky top-0 h-5vh text-center bg-black text-white">Your Current Channels :</h1>
        {/* // passing the setter function to Individual component */}
      {channelData?.map((items, index)=>(<IndividualChannel data={items} key={index} setChannelData={setChannelData} />)
        
    )}
    </div><br />
    <hr />
    <div className="w-full relative top-1/2">
{/* form to create a new chaneel */}
        <h1>Create A Channel to Start Uploading Videos : </h1>
        <button onClick={()=>setFormVisible(!formVisible)} className="bg-blue-500 p-2 m-2 border rounded-2xl"> {formVisible?'Cancel ' : "+ Create"} </button>
        <form className={formVisible?`visible w-full flex gap-1 flex-col items-center justify-center `: `invisible`}>
            <label htmlFor="channelName">Name of Your Channel:</label>
            <input onChange={(e)=>setChName(e.target.value)} type="text" name="channelName" id="channelName" placeholder="Enter Name of Your Channel" className="p-2 rounded-2xl bg-neutral-400 text-black w-1/2" /><br />

            <label htmlFor="channelName">Channel Tags:</label>
            <input onChange={(e)=>setChTags(e.target.value)} type="text" name="channelTags" id="channelTags" placeholder="EXAMPLES : sports technology History..--use space in between" className="w-1/2 text-black h-24 p-2 rounded-2xl bg-neutral-400 " /><br />

            <label htmlFor="channelName">Channel Description:</label>
            <input onChange={(e)=>setChDescription(e.target.value)} type="text" name="channelDescription" id="channelDescription" placeholder="Describe your channel in less than 20 words" className="p-2 rounded-2xl text-black bg-neutral-400 w-1/2 h-1/2" />

             <label htmlFor="channelBanner">Channel Banner Image Link:</label>
            <input onChange={(e)=>setChBanner(e.target.value)} type="text" name="channelBanner" id="channelBanner" placeholder="provide a link for your channel banner Image" className="p-2 rounded-2xl bg-neutral-400 w-1/2 text-black h-1/2" />
            <button className="p-2 border rounded-2xl bg-blue-500 mt-2" onClick={(e)=>createChannel(e)}>Create Channel</button>
       </form>
    </div>
      
    </div>)
}

export default Channels

















