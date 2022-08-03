import { useState } from "react"
import axios from 'axios'


type IRegister = {
userName:string,
email:string,
telegramID:string,
twitterHandle:string,
companyName:string,
gender:string
type:string, 
location:string,
reasonForAttending:string,
attendingOtherDays:boolean,
reasonForOtherDays:String
}

const defaultUserInput = {
userName:'',
email:'',
telegramID:'',
twitterHandle:'',
companyName:'',
gender:"",
location:"",
type:'attendant',
attendingOtherDays:false,
reasonForOtherDays:'',
reasonForAttending:''
}
type DetailedHTMLProps = /*unresolved*/ any
const ApplyAsAnAttendant = ()=>{
    const [userInputs, setUserInputs] = useState(defaultUserInput)
    const [dataStatus, setDataStatus] = useState({crud:false, error:''})
    const { crud } = dataStatus
    const [message, setMessage] = useState('')
    const  { 
    userName,
    email,
    telegramID,
    twitterHandle,
    companyName,
    location,
    reasonForAttending,
    reasonForOtherDays,
    attendingOtherDays,
    } = userInputs
    
    const handleChange=(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>)=>{
        const {name, value} = e.target
      setUserInputs((prev)=>({
        ...prev,
        ...(name==='attendingOtherDays' ? {[name]:Boolean(Number(value))} : {[name]:value})
      }))
    }


    const postData = async (data:IRegister)=>{
        const subData = {...data, name:data.userName, }
        setDataStatus(()=>({
          error:'',
          crud:true
         }))
      
        try {
            const result  = await axios.post('/api/participant', subData)
            setMessage(result.data.message)

            setDataStatus((prev)=>({
                error:'',
                crud:false
               }))
        }
        catch(e:any){
            setDataStatus(()=>({
                error:e?.response?.data?.message,
                crud:false
               }))

               window.scroll({top: 0, left: 0});
        }


    }

const handleSubmit =  (e: React.SyntheticEvent )=>{
    e.preventDefault()
    postData(userInputs)
    
}
    
    return (<div className="p-3 mt-12">
   <div className="text-center">
   <h1 className="mb-2 text-3xl font-semibold text-gray-800">Web3 Lagos 2022 Registration</h1>
 {!!dataStatus.error &&  <span className="text-red-500 ">{dataStatus.error}</span>}

   </div>
            <div className="p-10 mx-auto bg-white rounded-lg shadow md:w-3/4 lg:w-1/2">
      {
        !(!!message) && (<>
        
        <form onSubmit={handleSubmit}>
         <div className="mb-5">
           <label htmlFor="userName" className="block mb-2 font-bold text-gray-600">Name <span className="text-red-600">* </span></label>
           <input type="text" id="name" name="userName" onChange={handleChange} 
           placeholder="put in your full name" className="w-full p-3 border border-gray-300 rounded shadow mb-"
           value={userName} required />
         </div>

         <div className="mb-5">
           <label htmlFor="twitter" className="block mb-2 font-bold text-gray-600">Email <span className="text-red-600">*</span>  </label>
           <input type="email" id="twitter" name="email" onChange={handleChange} placeholder="Put in your email."className="w-full p-3 border rounded shadow"  value={email} required />
           {/* border-red-300  */}
           {/* <p className="mt-2 text-sm text-red-400">Email is required</p> */}
         </div>

         <div className="mb-5">
           <label className="block mb-2 font-bold text-gray-600">Location <span className="text-red-600">*</span>   </label>
           <input type="text"  name="location" placeholder="Put in your location." className="w-full p-3 border rounded shadow" onChange={handleChange} value={location} required />
         
         </div>

         <div className="mb-5">

         <label className="block mb-2 font-bold text-gray-600">Why Did you want to attend  <span className="text-red-600">*</span>  </label>
         <textarea name='reasonForAttending' value={reasonForAttending} onChange={handleChange} className="block w-full p-3 mt-1 border rounded shadow form-textarea" rows={3} placeholder="Enter your reason here." required></textarea>

         </div>




         <div className="mb-5 ">

<span  className="block mb-2 font-bold text-gray-600">Are you attending day 1 and 2 ?</span>
<div className="flex items-center p-3 mt-2" >
<div className="">
<input id="attendingOtherDays-yes" type="radio" className="form-radio" name="attendingOtherDays" value={1} onChange={handleChange} />
<label htmlFor="attendingOtherDays-yes" className="inline-flex items-center">
<span className="">
Yes
</span>
</label>
</div>

<div>
<input id="attendingOtherDays-no" type="radio" className="form-radio" name="attendingOtherDays" value={0} onChange={handleChange} />
<label htmlFor="attendingOtherDays-no" className="inline-flex items-center ml-6">
<span className="">No</span>
</label>
</div>
</div>

</div>


 {
  !!attendingOtherDays  && (<div className="mb-5">
   
  <label className="block mb-2 font-bold text-gray-600">Reasons For Attending Day 1 and 2 

  <div className="inline-block px-3 text-white bg-gray-500 rounded-md ">
      <p>Day 1 and 2 are technical sessions and workshops</p>
        <span className="capitalize">
    please note this is an invite only  
        </span>
    </div>

  </label>
  <textarea name='reasonForOtherDays' value={reasonForOtherDays} onChange={handleChange} className="block w-full p-3 mt-1 border rounded shadow form-textarea" rows={3} placeholder="Enter your reason here." required></textarea>
  
  </div>)
 }




         <div className="mb-5">
           <label className="block mb-2 font-bold text-gray-600">Company Name  </label>
           <input type="text"  name="companyName" placeholder="Put in your company name." className="w-full p-3 border rounded shadow" onChange={handleChange} value={companyName}  />
         
         </div>

         <div className="mb-5">
         <label  className="block mb-2 font-bold text-gray-600">Gender  </label>
           <select className="block w-full p-3 mt-1 border form-select" name='gender' onChange={handleChange}>
    <option selected disabled>Please Select an Option</option>
    <option value='male'>Male</option>
    <option value='female'>Female</option>
    <option value='others'>Others</option>
  </select>
         
         </div>


         <div>
         <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
         <div className="mb-5 ">
           <label  className="block mb-2 font-bold text-gray-600">Telegram Username  </label>
           <input type="text" name="telegramID" placeholder="Put in your telegram ID" className="w-full p-3 border rounded shadow" onChange={handleChange} value={telegramID} />
         
         </div>

         <div className="mb-5">
           <label  className="block mb-2 font-bold text-gray-600">Twitter Handle  </label>
           <input type="text" name="twitterHandle" placeholder="Put in your twitter handle" className="w-full p-3 border rounded shadow" onChange={handleChange} value={twitterHandle} />      
         </div>
      </div>
         </div>

         <button disabled={crud} className="block w-full p-4 font-bold text-white bg-blue-500 rounded-lg">
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



export default ApplyAsAnAttendant