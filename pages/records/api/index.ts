import axios from "axios"


export const getRecords = async(query:string)=>{
    try {
        const result = await axios.get(`/api/participant${!!query ? `?type=${query}`:""}`)   
        return result?.data?.data
    } catch (error) {
        throw error
    }
}