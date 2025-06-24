import { Link } from "react-router-dom"


export default function LargeToggle (){
    const smallToggleItems = [{
        name: "HOME",
        icon :`fa-solid fa-house-chimney` ,
        link : '/'
    },
    {
        name: "DOWNLOADS",
        icon : `fa-solid fa-download` ,
        link : '/downloads'
    },
    {
        name: "Your Profile ",
        icon :`fa-solid fa-user` ,
        link : '/profile',
        item :[ {
                name: "DOWNLOADS",
                icon : `fa-solid fa-download` ,
                link : '/downloads'
            },
            {
                name: "Your Videos",
                icon : `fa-solid fa-download` ,
            },
            {
                name: "History",
                icon : `fa-solid fa-download` ,
            },
            {
                name: "Liked Videos",
                icon : `fa-solid fa-download` ,
            },]
    },
    {
        name : "Videos",
        icon : `fa-solid fa-video`,
        link : '/videos'
    }]


    return(<div className="w-[50vw] md:w-[25vw]  z-30 flex flex-col justify-start items-center fixed top-[10vh]  h-screen text-white bg-neutral-950">
{/* mapping the navigation bar */}
{smallToggleItems.map((items, index)=><Link to={items.link} key={index}>
        <div className="flex justify-center items-center flex-col m-2 p-4 hover:bg-blue-950/50 rounded-2xl">
           <h1><i className={`${items.icon}`}></i></h1> 
           <h1>{ items.name}</h1>
           {items.item && (
                        <ul>
                            {items.item.map((subItem, subIndex) => (<Link to={subItem.link} key={subIndex}>
                                <li key={subIndex} className="text-center p-2 m-3 w-full">
                                    <i className={subItem.icon}></i> {subItem.name}<hr/>
                                </li></Link>
                            ))}
                            
                        </ul>
                    )} <hr />
        </div></Link>
    )}

    </div>)
}