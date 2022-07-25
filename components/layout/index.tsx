import {ReactNode} from "react"
import NavBar from "../header"

interface Props {
    children:ReactNode
}

const Layout =({children}:Props)=>{
    return (<>
    <NavBar />
    {children}
    </>)
}

export default Layout