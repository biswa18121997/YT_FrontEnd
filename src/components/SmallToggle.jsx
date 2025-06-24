import { Link } from "react-router-dom"
//small toggle componenet..
export default function SmallToggle(){
    const smallToggleItems = [{
        name: "HOME",
        icon :`fa-solid fa-house-chimney` ,
        link : '/'
    },
    {
        name: "Downloads",
        icon : `fa-solid fa-download` ,
        link : '/downloads',
    },
    {
        name: "Your Profile",
        icon :`fa-solid fa-user` ,
        link : '/profile'
    },
    {
        name : "Videos",
        icon : `fa-solid fa-video`,
        link : '/videos'
    }]
    //mapping small toggle components..
    return(<div className="invisible sm:visible  flex flex-col fixed justify-self-start items-center top-[10vh] w-[8vw] p-4 bg-black h-screen">
        {smallToggleItems.map((items, index)=>
        <Link to={items.link} key={index}>
        <div className="flex flex-col hover:border items-center  p-2 box m-3">
           <h1><i className={`${items.icon}`}></i></h1> 
           <h1 className="text-sm">{ items.name}</h1>
        </div>
        </Link>
    )}

    </div>)

}