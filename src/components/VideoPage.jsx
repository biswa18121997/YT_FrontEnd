import {Link, useParams} from 'react-router-dom'
import { useContext,useState,useEffect } from 'react'    
import { UserContext } from '../utils/Context'
import React from 'react'
import { useFetch } from '../utils/Fetch';
import Youtube from 'react-youtube'
import VideoPageSidebarSingle from './VideoPageSidebarSingle';
import IndividualComments from './IndividualComments';
import LoadingScreen from './LoadingScreen';
//main video player pge...
function VideoPage() {
    let [tokenVerified, setTokenVerified] = useState(false);
    let [like,setLike] = useState(false);
    let [dislike, setDislike] = useState(false);
    let [ subs, setSubs] = useState(false);
    let [fullDes, setFullDes] = useState(false);
    let [edit, setEdit ] = useState(false);
    let [sideBar,setSideBar] = useState([]);
    let [comment, setComment] = useState('');
    let [commentsList,setCommentsList] = useState([]);
    let params = useParams();
    let {token, user, profile}  = useContext(UserContext);
    let videoID = params.id;
    const API_KEY_2 = 'AIzaSyANrQ1rFYCVFXKpLcuqYnQ7yLuzOcxbMy8';
    const API_KEY = "AIzaSyCLfNg8E42zJZF5obZA-5e4AboR5YzKRFY"; 
    let URL_PLAY =`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoID}&key=${API_KEY}`;
    let {data, error, loading} = useFetch(URL_PLAY);
    if(loading)
        <LoadingScreen />
   let videoData = data?.items?.[0];
    //fetching comments made on the video..
    async function fetchVideoComments() {
        try {
            console.log(token)
            let reqToServer = await fetch(`http://localhost:8086/video/${videoID}`,{
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json',
                                        'Authorization': `JWT ${token}`
                             },
                        });
            let response = await reqToServer.json();  
            //setting comments list..
            setCommentsList(response);  
        } catch (error) {
            console.log(error);
        }
        
    }
   //sending video date to be saved on db and update userprofile data on db...
    async function sendVideoData(){
            try {
                const videoData =await data?.items?.[0];
                let vidPageReq = {
                    videoId:videoID,token,user,videoData
                };
               console.log(vidPageReq);
                let reqVideoPageData = await fetch(`http://localhost:8086/video/${params.id}`,{
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify( {videoId:videoID,token,user,videoData} )
                })
                let resVideoPage = await reqVideoPageData.json();
                console.log(resVideoPage)
                if(!resVideoPage.success){
                    setTokenVerified(false)
                }
                else{
                    setTokenVerified(true);
                }
                    
                console.log(resVideoPage);
                
            } catch (error) {
                console.log(error)
            }  
        }
    //hndle liking disliking commenting and downloads features....
    async function Likes_Dislikes_Comments_Subscribe_Download(actionType){
        try {
            if(actionType == 'post comment'){
                if(comment.trim().length ==0 )
                    return;

            }
            let sendToServer ={
                token, user, videoId:videoID, videoData: data.items[0] ,update : actionType,comment
            }
            console.log(videoID);
            let sendRequest = await fetch(`http://localhost:8086/video/${params.id}`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({token, user, videoId:videoID, videoData: data.items[0] ,update : actionType,comment})
            })
            let response = await sendRequest.json();
           setCommentsList(response);
           console.log(response)
            setComment('');
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{  
        if(data && token){
            sendVideoData();
            fetchVideoComments();
        }      
        
        
        //need to add something so that comments are fetched and displayed 
    },[URL_PLAY,data])
    return (tokenVerified? <div className='w-[85vw] justify-center items-center relative left-[10vw] h-full flex-col flex top-[15vh]'><h1 className='text-white text-3xl text-center font-semibold'>invalid token plesae Login again..!</h1> <Link to={`/login`}> <button className='border p-2 m-2 rounded-2xl'>LOGIN</button></Link> </div> : <div className="w-[85vw] relative left-[10vw] h-full flex-col md:flex-row  flex top-[22vh] sm:top-[19vh] md:top-[15vh]">
        <div className='m-5 w-full h-full '>
            <div className="relative w-full h-[60vh]  overflow-hidden rounded-xl">
            <Youtube  className="w-full h-full "  videoId={params.id} opts={{ width: '100%', height : '100%' , playerVars: {autoplay: 0,modestbranding: 1,rel: 0,}}} />
            </div>
            <hr />
            <h1 className='text-2xl  font-semibold'>{data?.items?.[0]?.snippet?.title}</h1>    
            {/* buttons for like dislike subscribe comments and edit and download etc      */}
            <div className='flex justify-between'>               
                <section className='flex justify-center items-center'> 
                    <Link to={`/channels/${data?.items?.[0]?.snippet?.channelId}`}><h1 className='text-xl'>{data?.items?.[0]?.snippet?.channelTitle}</h1></Link>
                    <button onClick={()=>{setSubs(!subs) ;Likes_Dislikes_Comments_Subscribe_Download('subscribe')}} className={`${subs ? 'bg-orange-800' : 'bg-red-500'} text-white font-bold flex justify-center items-center p-3 m-2 h-[5vh] text-lg rounded-2xl`}>Subscribe <i className="fa-solid fa-bell m-1"></i> </button>
                </section>
                <section className='flex'>
                <button onClick={()=>{setLike(!like) ;Likes_Dislikes_Comments_Subscribe_Download('increament like')}} className={`${like?'bg-blue-400' : 'bg-white'} h-[5vh] flex justify-center items-center  p-3 m-1 rounded-2xl text-black active:bg-blue-400 active:scale-120 duration-500`}><i className="fa-solid fa-thumbs-up m-1"></i>{(data?.items?.[0]?.statistics?.likeCount/1000).toFixed(2)}k</button>
                <button onClick={()=>{setDislike(!dislike) ;Likes_Dislikes_Comments_Subscribe_Download('increament dislike')}} className={`${dislike ? 'bg-neutral-500' : 'bg-white'} h-[5vh] flex justify-center items-center bg-neutral-300 p-3 m-1 rounded-2xl text-black`}><i className="fa-solid fa-thumbs-down m-1"></i></button>
                <button className='h-[5vh] flex justify-center items-center bg-neutral-300 p-3 m-1 rounded-2xl text-black'>  Share <i className="fa-solid fa-share-nodes m-1 text-black"></i></button>
                <button onClick={()=>Likes_Dislikes_Comments_Subscribe_Download('download')} className='h-[5vh] flex justify-center items-center bg-neutral-300 p-3 m-1 text-black rounded-2xl'> Download <i className="fa-solid fa-download m-1"></i></button>
                </section>              
            </div>
            <hr />
            <div>
                {/* toggle between full and partial description... */}
               {!fullDes ? (<h1 className='text-sm font-semibold'>{data?.items?.[0]?.snippet?.description?.slice(0, 200)}...... <span onClick={() => setFullDes(true)} className='text-gray-500 cursor-pointer'> SHOW MORE</span></h1>) :
                (<h1>{data?.items?.[0].snippet.description} <span onClick={() => setFullDes(false)} className='text-gray-500 cursor-pointer'> SHOW LESS</span></h1>)}

            </div>

{/* login display card for unsigned user.. */}
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

{/* //comments visible to only signed in user */}
            {!localStorage.getItem('userAuth')?.user && <div className='pt-3'> 
               <h1>Comments : </h1> 
                <input type="text" value={comment} onChange={(e)=>setComment(e.target.value)} name="comment" id="comment" placeholder='Add Your Comments Here..!'  className='p-2 bg-neutral-300 w-10/12 h-[15vh] rounded-2xl text-black'/>
                <button onClick={()=>Likes_Dislikes_Comments_Subscribe_Download('post comment')} className='p-2 m-1 bg-blue-500 text-blue-50 rounded-2xl w-2/12'>Comment</button>
                <div className='w-3/4 h-fit min-h-[100px]  m-2 rounded-2xl flex flex-col-reverse border-r p-2 justify-center items-center'>
                   {!commentsList && <h1>No Comments On this Video Yet..</h1>}
                    {commentsList?.commentsInfo?.map((items, index)=>(<IndividualComments comments={items} setCommentsList={setCommentsList} key={index} />))}
                </div>       
            </div>}
        </div>
        {/* suggestion video sidebarr */}
        <VideoPageSidebarSingle prevPageInfo={ data?.items?.[0]?.snippet?.tags} />
    </div>)  
}
export default VideoPage
