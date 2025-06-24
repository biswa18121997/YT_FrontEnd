import React,{lazy, Suspense} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
let Login = lazy(()=>import('./components/Login.jsx'))
// import Login from './components/Login.jsx'
let HomePage = lazy(()=>import('./components/HomePage.jsx'))
// import HomePage from './components/HomePage.jsx'
let  Register= lazy(()=>import('./components/Register.jsx'))
// import Register from './components/Register.jsx'
let Channels = lazy(()=>import('./components/Channels.jsx'))
// import Channels from './components/Channels.jsx'
let VideoPage = lazy(()=>import('./components/VideoPage.jsx'))
// import VideoPage from './components/VideoPage.jsx'
let Downloads = lazy(()=>import('./components/Downloads.jsx'))
// import Downloads from './components/Downloads.jsx'
let Profile = lazy(()=>import('./components/Profile.jsx'))
// import Profile from './components/Profile.jsx'
let  ChannelsPage= lazy(()=>import('./components/ChannelsPage.jsx'))
// import ChannelsPage from './components/ChannelsPage.jsx'
let  Search_Videos= lazy(()=>import('./components/Search_Videos.jsx'))
// import Search_Videos from './components/Search_Videos.jsx'
let  Error= lazy(()=>import('./components/Error.jsx'))
// import Error from './components/Error.jsx'
let LoadingScreen = lazy(()=>import('./components/LoadingScreen.jsx'))

//Routes for all Paths.. along with error and lazy loads
const routes=createBrowserRouter([{
    path:"/",
    element:<App/>,
    errorElement:<Error/>,
    children :[
      {
        path : '/',
        element : <Suspense fallback={<LoadingScreen />}> <HomePage /></Suspense>
      },
      {
        path:"/login",
        element: <Suspense fallback={<LoadingScreen />}> <Login /></Suspense>
      },
      {
        path : '/register',
        element :<Suspense fallback={<LoadingScreen />}> <Register /></Suspense>
      },
      {
        path : '/channel',
        element : <Suspense fallback={<LoadingScreen />}> <Channels /></Suspense>
      },
      {
        path : '/video/:id',
        element : <Suspense fallback={<LoadingScreen />}> <VideoPage /></Suspense>
      },
      {
        path: '/downloads',
        element:<Suspense fallback={<LoadingScreen />}>  <Downloads /></Suspense>,
      },
      {
        path : '/profile',
        element: <Suspense fallback={<LoadingScreen />}><Profile /></Suspense>
      },
      
      {
        path : '/channels/:id',
        element : <Suspense fallback={<LoadingScreen />}><ChannelsPage/ ></Suspense>
      },
      {
        path : '/videos',
        element : <Suspense fallback={<LoadingScreen />}><Search_Videos /></Suspense>
      },
      {
        path : '/videos/:id',
        element: <Suspense fallback={<LoadingScreen />}><Search_Videos /></Suspense>
      }
    ]

}])

createRoot(document.getElementById('root')).render(

    
     <RouterProvider router={routes}/>
  
)
