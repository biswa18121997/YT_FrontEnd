import {Link } from 'react-router-dom'
//individeula video card component..
function VideoPreviewCard({item}) {


  return (<div className="w-full h-full max-w-full flex flex-col justify-center hover:scale-105  duration-500 items-center bg-blend-darken bg-gray-950-950 rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow  m-2   ">
<Link to={`/video/${item?.id?.videoId || item?.id}`}>
            <img src={item?.snippet?.thumbnails?.medium?.url} alt="" className="w-full md:w-screen sm:w-screen object-center h-1/2 rounded-t-2xl"/>
            <h2 className="text-md font-semibold text-white m-1 p-2">{item?.snippet?.description?.slice(0,40)}</h2>
            <p className="text-sm font-semibold text-neutral-400 p-1 m-1 ">{item?.snippet?.channelTitle}</p><hr />
            <p className="w-full text-right text-white text-xs "><i className="fa-solid fa-clock"> </i> {item?.snippet?.publishedAt}</p>
            <hr />
            <span className="flex gap-[10%] items-center text-neutral-500 mt-1 pb-1 text-sm">
                <span className='p-1'>{item?.statistics?.likeCount}  <i className="fa-solid fa-thumbs-up pb-1"></i>Likes</span>
                <span className='p-1'>{item?.statistics?.viewCount}  <i className="fa-solid fa-eye pb-1"></i>Views</span>
                <span className='p-1'>{item?.statistics?.commentCount}  <i className="fa-solid fa-comment pb-1"></i>Comments</span>
            </span>
    </Link>
      
    </div>)
}

export default VideoPreviewCard
