import Navbar from "./components/Navbar"
import { Outlet } from "react-router-dom"
import { useState } from "react"
import { UserProvider} from "./utils/Context.jsx"



function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const setData = ({user,profile})=>{
    setUser(user);
    setProfile(profile);
  }

  return (
    <>
    <UserProvider >
      <Navbar/>
      <Outlet />
    </UserProvider>
    </>
  )
}

export default App
