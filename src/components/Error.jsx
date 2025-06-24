import {useRouteError,Link} from 'react-router-dom'


function Error(){
    const err=useRouteError();
    console.log(err);


    return(<div className="h-screen  flex flex-col  justify-center items-center p-4 m-4 bg-red-600/60 ">

        <Link to={'/'}>
        <button className="border-2 bg-green-500 p-3 text-red-500 font-bold text-lg"><i className="fa-solid fa-backward text-2xl m-2 text-yellow-300"></i>Back to HomePage </button>
        </Link>
        <div className=" flex     justify-center items-center">
           {/* All error imformation is dumped i cant give more error info */}
            <span className='text-6xl'>
                <i className="fa-solid fa-triangle-exclamation"></i>
            </span>
            <section className='border p-4 m-4 border-white rounded-3xl'>
                <h1 className='text-5xl m-4 font-extrabold'>Something Went Wrong..</h1>

                <h2 className='text-3xl text-white font-bold'>Status:{err.status} <br/> {err.statusText }</h2>
                {/* <h2 className='text-3xl text-white font-bold'>{ extraInfo?.map(items=>items)}</h2> */}
                <h2 className=' text-neutral-950 text-xl font-bold'> {err.data}</h2>
               
            </section>
           
            
        </div>
        </div>
    )
}
export default Error