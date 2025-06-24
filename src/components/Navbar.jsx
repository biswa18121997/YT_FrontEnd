import LargeToggle from './LargeToggle';
import SmallToggle from "./SmallToggle";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {UserContext} from '../utils/Context.jsx';
import { useContext } from 'react';

//navbar component..

export default function Navbar(){
    let [search, setSearch] = useState('');
    let navigate = useNavigate();
    const [smallToggle,setSmallToggle] =useState(true);
    let {user, profile, token} = useContext(UserContext);
    let {setData}  = useContext(UserContext);
    //sign out button..
    function signOut(){
        localStorage.clear();
        setData({ user:{}, profile:{} ,token: {}});        
        navigate('/login');

    }
  


    return(<>
    <nav className="  z-90  bg-neutral-700/50 h-fit flex justify-center-safe md:items-center gap-5 fixed top-0 w-full md:w-screen flex-col md:flex-row ">
        <div className="flex flex-wrap w-1/3 m-2 justify-evenly ">
            <i onClick={()=>setSmallToggle(!smallToggle)} className="fa-solid fa-bars fixed top-5 left-5 active:animate-spin text-xl sm:2xl md:text-3xl mr-4"></i>
            <Link to={'/'}>
             <div className="flex justify-center items-center m-6 sm:flex">
                <i className="fa-brands fa-youtube h-full  text-red-600 m-1 text-xl sm:text-2xl md:text-4xl "></i>
                <h1 className="text-2xl sm:text-2xl md:text-3xl  font-bold font-serif m-1">YouTube</h1>
            </div>
            </Link>
        </div>
        <div className="w-[80vw]  md:w-1/3 max-[20vw] flex justify-end items-end ">
            <input type="text" placeholder='SEARCH' onChange={(e)=>setSearch(e.target.value)} className="  w-4/5 p-2 h-full  border rounded-l-2xl bg-neutral-500 font-bold text-black text-xl"/>
           <Link to={search? `/videos/${search}`:`/videos`}> <button onClick={()=>setSearch('')} className="w-full h-full bg-blue-950 border  p-2 rounded-r-2xl"><i className="fa-solid fa-magnifying-glass-arrow-right text-2xl"></i></button></Link>
        </div>
        <Link to={localStorage.getItem('userAuth')?'/channel':'/login'}>
                <div className='p-2 m-2 border rounded-2xl ml-16 w-fit text-wrap bg-purple-400 text-black'>
                    +Create/Channels
                </div>
        </Link>
        
        <div className="flex w-1/3 justify-center items-center gap-5"> 
            
           
            <div className='p-2 hidden md:flex flex-row gap-2  '>
                 <Link to={'/profile'}>
                    <img className='h-10 w-10 border bg-cover bg-center rounded-full' src={user?.picture} alt="" />    
                    <h1>{user?.name}</h1>
                </Link>
                <Link to={localStorage.getItem('userAuth')?'/':'/login'}>
                    <button onClick={signOut} className='p-1 m-1 border rounded-2xl text-sm'> <i className="fa-solid fa-right-from-bracket"></i> {localStorage.getItem('userAuth')? "LogOut" : "Log In"}</button>
                </Link>
            </div>
           
        </div>
        
    </nav>
        { smallToggle &&<SmallToggle />}
        {!smallToggle && <LargeToggle />}
    </>)
    
    
}