import { useState,useContext } from "react"
import { Link, useNavigate } from "react-router-dom";
import {UserContext} from '../utils/Context.jsx'



export default  function Login(){

    const [show, setShow] = useState(false);
    let [email,setEmail] = useState('');
    let [password,setPassword] =useState('');
    let [response , setResponse] = useState();
    let redirect = useNavigate();
    let {setData}  = useContext(UserContext);
//login page component..
    async function handleLogin(e){
        e.preventDefault();
        try {
            //sending email pass to middlewares..
            const res = await fetch('http://localhost:8086/login', { // Change URL if needed
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            let data = await res.json();
            setResponse(data);
          if(data.success){
            setData({ user: data.user, profile: data.profile ,token: data.token});
            localStorage.setItem('userAuth', JSON.stringify(data));
            redirect('/');
          }
          else{ 
            setData({});
            
          }
        } catch (error) {
            console.log(error)
        }
    }


    return(<div className="w-[80vw] relative left-[20vw] h-screen top-[20vh] sm:top-[15vh] md:top-[12vh] ">

        <div className="flex flex-col justify-center items-center h-4/5 w-3/4 ">
            <h1 className="text-3xl font-serif underline underline-offset-8">Login / Sign in User :</h1><br /><br />
            <hr />
            <i className="fa-solid fa-user p-2 m-2 rounded-2xl text-4xl border-2 "></i>


            <form action="/login" className="flex flex-col justify-start items-start border p-4 rounded-2xl w-2/3 w-[80vw] md:w-2/3">
                <label htmlFor="loginmail" className="">Registered  Email :</label>
                <input type="text" name="email" onChange={(e)=>setEmail(e.target.value)} id="loginmail" placeholder="Enter Your Registered E-mail.." className="p-2 bg-neutral-400 w-full rounded-3xl m-2" />
                <label htmlFor="loginpassword">Password :</label>
                <section className="w-full flex justify-center items-center">
                <input type={show?'text':'password'} name="password"  onChange={(e)=>setPassword(e.target.value)} id="loginpassword" placeholder="Enter your password " className="p-2 bg-neutral-400 w-full rounded-3xl m-2"/>
                <i onClick={()=>setShow(!show)} className={show?'fa-solid fa-eye':'fa-solid fa-eye-low-vision' }></i>
                </section>
                <p className="text-blue-700 underline underline-offset-8 m-1" onClick={()=>alert('No Worries just Create a New One.')}>Forgot your Password .? </p>
                
                    <button onClick={(e)=>handleLogin(e)} className="p-2 m-2 rounded-2xl border w-full">Login</button> 
                    <Link to={'/register'} className="w-full">
                        <button className="p-2 m-2 rounded-2xl border w-full bg-green-400">Register</button> 
                    </Link>

                    {!response?.sucess && <h2 className="text-center text-red-400 font font-semibold">{response?.message}</h2>}

            </form>
        </div>
    </div>)
}