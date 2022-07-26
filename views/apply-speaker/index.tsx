import { useState } from "react"
import axios from 'axios'

type Ispeaker = {
speakerName:string,
email:string,
telegramID:string,
twitterHandle:string,
companyName:string,
presentationTitle:string,
pitchStory:string,
spokenAtWeb3Before:boolean
}
const defaultUserInput = {
speakerName:'',
email:'',
telegramID:'',
twitterHandle:'',
companyName:'',
presentationTitle:'',
pitchStory:"",
spokenAtWeb3Before:false
}
const ApplyAsaSpeaker = ()=>{
    const [userInputs, setUserInputs] = useState(defaultUserInput)
    const [dataStatus, setDataStatus] = useState({crud:false, error:''})
    const { crud } = dataStatus
    const [message, setMessage] = useState('')
    const  { 
    speakerName,
    email,
    telegramID,
    twitterHandle,
    companyName,
    presentationTitle,
    pitchStory,
    spokenAtWeb3Before  } = userInputs
    
    const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        //
        const {name, value} = e.target
      setUserInputs((prev)=>({
        ...prev,
        [name]:value
      }))
    }

    const postData = async (data:Ispeaker)=>{
        const subData = {...data, name:data.speakerName}
        setDataStatus((prev)=>({
          error:'',
          crud:true
         }))
        try {
            const result  = await axios.post('/api/speakers', subData)
            setMessage(result.data.message)
        }
        catch(e){
            
            console.log('catch error', e)
        }

        setDataStatus((prev)=>({
          error:'',
          crud:false
         }))
    }

const handleSubmit =  (e: React.SyntheticEvent )=>{
    e.preventDefault()
    postData(userInputs)
    
}
    
    return (<div className="mt-12">
   
   <h1 className="text-2xl text-center">Speakers' Application</h1>
            <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
      {
        !(!!message) && (<>
        
        <form onSubmit={handleSubmit}>
         <div className="mb-5">
           <label htmlFor="speakerName" className="block mb-2 font-bold text-gray-600">Name <span className="text-red-600">* </span></label>
           <input type="text" id="name" name="speakerName" onChange={handleChange} 
           placeholder="Put in your fullname." className="border border-gray-300 shadow p-3 w-full rounded mb-"
           value={speakerName} />
         </div>

         <div className="mb-5">
           <label htmlFor="twitter" className="block mb-2 font-bold text-gray-600">Email <span className="text-red-600">*</span>  </label>
           <input type="email" id="twitter" name="email" onChange={handleChange} placeholder="Put in your name." className="border border-red-300 shadow p-3 w-full rounded"  value={email} />
           <p className="text-sm text-red-400 mt-2">Email is required</p>
         </div>
         <div className="mb-5">
           <label  className="block mb-2 font-bold text-gray-600">Telegram ID  </label>
           <input type="text" name="telegramID" placeholder="Put in your telegram ID" className="border shadow p-3 w-full rounded" onChange={handleChange} value={telegramID} />
         
         </div>
         <div className="mb-5">
           <label className="block mb-2 font-bold text-gray-600">Company Name  </label>
           <input type="text"  name="companyName" placeholder="Put in your company name." className="border shadow p-3 w-full rounded" onChange={handleChange} value={companyName}  />
         
         </div>
         <button disabled={crud} className="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg">
            {crud ? "Sending...": "Submit"}
            </button>
       </form>
        
        </>)
       }

       {
        !!message  && message 
       }
     </div>
           


    </div>

    )
}



export default ApplyAsaSpeaker