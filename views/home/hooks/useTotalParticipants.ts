import { useEffect, useState } from "react"
import { getTotalRecords } from "../api"

const useTotalParticipants =()=>{
    const [data, setData] = useState({total:0, loading:true, error:false})

    const getData = async()=>{
        setData((prev)=>({
            ...prev,
            loading:true
        }))
        try{
        const data = await getTotalRecords()
            setData((prev)=>({
                ...prev,
                loading:false, 
                total:data!.data!.total ?? 0
            }))
        }
         catch(e){
            setData(()=>({
                total:0,
                error:true,
                loading:false
            }))
        }
    }
    useEffect(()=>{
        getData()
    },[])


    return  data
    

}


export default useTotalParticipants