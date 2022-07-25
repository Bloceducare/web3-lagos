import dynamic from 'next/dynamic'
import React, {ReactNode} from 'react'

interface Props {
    children:ReactNode
}
const NonSSRWrapper = ({children}:Props) => ( 
    <>{children}</> 
) 



export default dynamic(() => Promise.resolve(NonSSRWrapper), { 
    ssr: false 
})