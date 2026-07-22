import { Outlet } from "react-router-dom"


const AppLayout = () => {
  return (
    <>
     <p>banner</p>
     <p>header</p> 
     <main className="min-h-screen"><Outlet /></main>
     <p>footer</p>
     <p>Cartscrollbar</p>
    </>
  )
}

export default AppLayout
