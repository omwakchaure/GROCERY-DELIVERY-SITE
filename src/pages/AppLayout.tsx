import { Outlet } from "react-router-dom"
import Banner from "../components/Banner"


const AppLayout = () => {
  return (
    <>
     <Banner />
     <p>header</p> 
     <main className="min-h-screen"><Outlet /></main>
     <p>footer</p>
     <p>Cartscrollbar</p>
    </>
  )
}

export default AppLayout
