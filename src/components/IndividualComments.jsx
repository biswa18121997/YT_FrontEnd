import React from 'react'
import  {useState, useContext, useEffect} from 'react'
import {UserContext} from '../utils/Context.jsx'
import { useParams } from 'react-router-dom';
//individual comment componenet present in the videos page
function IndividualComments({comments, setCommentsList}) {
    let params = useParams();
    let [editComment, setEditComment] = useState(comments.comment);
    let [edit, setEdit] = useState(false);
    let {user, token } = useContext(UserContext);
//function to requset to server to delete or edit only thos comments made by the logged in user
    async function EditDelete(id, videoID, actionType){
        try {
            let sendToServer;
            if(actionType == 'edit'){
                sendToServer = {token, user, commentID:id, videoID , actionType, editComment};
            }
            else if(actionType == 'delete'){
                sendToServer = {token, user, commentID:id, videoID , actionType, editComment};
            }
            
            let reqToServer = await fetch(`http://localhost:8086/video/${params.id}`,{
                                            method: 'PATCH',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify(sendToServer)
                                        });
            let response = await reqToServer.json();
            // setting refreshed comments list
            setCommentsList(response);
            setEdit(false)
                
        } catch (error) {
            console.log(error)
        }

        

    }
  return (
    <div className='rounded-4xl text-white flex gap-5 flex-col border w-full h-fit justify-between items-stretch p-4 m-2'>
        <section className='flex justify-between items-center'>
            <section>
                <img className='w-[6vw] h-[8vh] rounded-full' src={`https://www.citypng.com/public/uploads/preview/hd-man-user-illustration-icon-transparent-png-701751694974843ybexneueic.png`} alt="" />

                <h1>UserID : {comments?.userId}</h1>
                <p className='text-sm text-neutral-500'>{comments?.date}</p>
            </section>
            {/* making sure the comment is made by the logged in user */}
        { (comments.userId == user.email || comments.userId == user.userID) &&   <section className={`flex flex-col `}>
        {edit && <input onChange={(e)=>setEditComment(e.target.value)} className='text-black w-[30vw] h-[10vh] bg-amber-100'/>}
                <button onClick={(e)=>setEdit(!edit)}  className='p-1 m-1 border rounded-xl text-blue-500'> <i className={edit? 'fa-solid fa-xmark':`fa-solid fa-pen-nib`} > </i>{edit? `cancel` :`edit`} </button>
              {edit &&  <button onClick={()=>EditDelete(comments.commentID,comments.videoID,'edit')}  className='p-1 m-1 border rounded-xl text-blue-500'> <i className="fa-solid fa-floppy-disk"></i>SAVE </button>}
                <button onClick={()=>EditDelete(comments.commentID, comments.videoID,'delete')} className='p-1 m-1 border rounded-xl text-red-500'><i className="fa-solid fa-trash-can"></i>delete</button>
            </section>}
            
            
        </section>

        <h1 className='p-5 w-full text-wrap rounded-4xl bg-neutral-300 text-black border '>{comments.comment}</h1>
    </div>
  )
}

export default IndividualComments
