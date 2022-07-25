import { ReactNode } from 'react'
import NextLink from 'next/link'

interface Props {
    children:ReactNode
    href:string
}
const Link = ({children, href}:Props) =>{
    console.log(href)
    return (<><NextLink  href={href}>
        <>
         {children}
        </>
         </NextLink></>)
}


export default Link