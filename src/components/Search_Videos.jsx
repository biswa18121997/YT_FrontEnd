import React, { useState, useContext, useEffect } from 'react'
import { useParams ,Link} from 'react-router-dom'
import { UserContext } from '../utils/Context';
import VideoPreviewCard from './VideoPreviewCard';
//videos page componenet..
function Search_Videos() {
  let {user, token} = useContext(UserContext);
    let params =  useParams();
    let [searchRes, setSearchRes] = useState([]);
    let [filterRes, setFilterRes] = useState([]);
    let [filter, setFilter ] = useState('Recently Added');
    //sending to server the selected filter and the search parameter..
    async function VideosPageSearch() {
      try {
        let sendToServer = {
          token, filter, user,search : params?.id?params?.id:''
        }
        let reqToServer = await fetch(`http://localhost:8086/videos/${params.id}`,{
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({sendToServer,token})
                            })
        let response = await reqToServer.json();
        //search result sett..
        setSearchRes(response.searchResult);
        //filter is sett..
        if(filter == 'Recently Liked')
          setFilterRes(response?.profile?.recentlyLikedVideos);
        else if(filter == 'Recently Watched')
          setFilterRes(response?.profile?.history);
        else if(filter == 'Action')
          setFilterRes(response?.action);
        else if(filter == 'Technology')
          setFilterRes(response?.Technology);
        else if(filter == 'Recently Added')
          setFilterRes(response?.recentlyAdded);        
      } catch (error) {
        console.log(error);
        setSearchRes([]);
        setFilterRes([]);
      }    
    }
    useEffect(()=>{
        VideosPageSearch();
    },[filter,params.id])
  return (
    <div className="w-[85vw] relative left-[12vw]  h-screen top-[12vh]">
      <section className='flex justify-around sticky top-[20vh] sm:top-[15vh] md:top-[10vh] z-20 bg-neutral-600'> 
        <li className={`${filter === 'Action' ? 'bg-red-500' : 'bg-black'} p-2 m-2 rounded-2xl border list-none`} onClick={()=>{ setFilter('Action')}}>Action </li>
        <li className={`${filter === 'Technology' ? 'bg-red-500' : 'bg-black'} p-2 m-2 rounded-2xl border list-none`} onClick={()=>{setFilter('Technology')}}> Technology</li>
        <li className={`${filter === 'Recently Added' ? 'bg-red-500' : 'bg-black'} p-2 m-2 rounded-2xl border list-none`} onClick={()=>{setFilter('Recently Added')}}>Recently Added</li>
        <li className={`${filter === 'Recently Watched' ? 'bg-red-500' : 'bg-black'} p-2 m-2 rounded-2xl border list-none`} onClick={()=>{setFilter('Recently Watched')}}> Recently Watched</li>
        <li className={`${filter === 'Recently Liked' ? 'bg-red-500' : 'bg-black'} p-2 m-2 rounded-2xl border list-none`} onClick={()=>{setFilter('Recently Liked')}}> Recently Liked</li>
      </section>
      <hr />
              {params.id  &&  <h1 className='text-center text-xl underline m-4'>Your Search Results : </h1>} <hr /><br />
{/* search results videos */}
        {params.id &&<div className='grid grid-cols-3  h-fit  gap-3'>
          {searchRes?.map((item, index)=><Link to={`/video/${item.videoId}`} key={index}> <div className=''> 
            <img src={item.videoThumbnail} alt="" className='w-full' />
            <div>
              <h1 className='text-xl font-bold'>{item?.videoTitle}</h1>
              <h1 className='text-lg text-neutral-500'>{item?.videoDescription.slice(0,70)}</h1>
              <h1 className='text-sm'>{item?.channelId}</h1>
            </div>


          </div></Link>)}


        </div>} <br />
{/* filter videos  */}
<h1 className='text-xl text-center m-3 underline'>Filter: {filter}</h1><hr /><br />
        <div className='grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 grid-rows-3 gap-4 gap-y-6'>{filterRes.map((item, index)=><Link to={`/video/${item.videoId}`} key={index}> <div className=''> 
         { filterRes.length>0  &&  <img src={item.videoThumbnail} alt="" className='w-full' />}
          {  filterRes.length>0 &&  <div>
              <h1 className='text-xl font-bold'>{item?.videoTitle}</h1>
              <h1 className='text-lg text-neutral-500'>{item?.videoDescription.slice(0,70)}</h1>
              <h1 className='text-sm'>{item?.channelId}</h1>
            </div>}
          


          </div></Link>)}

        </div>

      
    </div>
  )
}

export default Search_Videos
