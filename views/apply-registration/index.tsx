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
    
    return (<div className="mt-12 p-3">
   <div className="text-center">
   <h1 className="text-3xl  font-semibold text-gray-800 mb-2">Web3 Lagos 2022 Registration</h1>
 {!!dataStatus.error &&  <span className="  text-red-500">{dataStatus.error}</span>}

   </div>
            <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
      {
        !(!!message) && (<>
        
        <form onSubmit={handleSubmit}>
         <div className="mb-5">
           <label htmlFor="userName" className="block mb-2 font-bold text-gray-600">Name <span className="text-red-600">* </span></label>
           <input type="text" id="name" name="userName" onChange={handleChange} 
           placeholder="put in your full name" className="border border-gray-300 shadow p-3 w-full rounded mb-"
           value={userName} required />
         </div>

         <div className="mb-5">
           <label htmlFor="twitter" className="block mb-2 font-bold text-gray-600">Email <span className="text-red-600">*</span>  </label>
           <input type="email" id="twitter" name="email" onChange={handleChange} placeholder="Put in your email."className="border shadow p-3 w-full rounded"  value={email} required />
           {/* border-red-300  */}
           {/* <p className="text-sm text-red-400 mt-2">Email is required</p> */}
         </div>

         <div className="mb-5">
           <label className="block mb-2 font-bold text-gray-600">Location <span className="text-red-600">*</span>   </label>
           <input type="text"  name="location" placeholder="Put in your location." className="border shadow p-3 w-full rounded" onChange={handleChange} value={location} required />
         
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

  <div className=" text-white inline-block rounded-md bg-gray-500 px-3">
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
           <input type="text"  name="companyName" placeholder="Put in your company name." className="border shadow p-3 w-full rounded" onChange={handleChange} value={companyName}  />
         
         </div>

         <div className="mb-5">
         <label  className="block mb-2 font-bold text-gray-600">Gender  </label>
           <select className="form-select mt-1 block w-full border p-3" name='gender' onChange={handleChange}>
    <option selected disabled>Please Select an Option</option>
    <option value='male'>Male</option>
    <option value='female'>Female</option>
    <option value='others'>Others</option>
  </select>
         
         </div>


         <div>
         <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
         <div className="mb-5 ">
           <label  className="block mb-2 font-bold text-gray-600">Telegram ID  </label>
           <input type="text" name="telegramID" placeholder="Put in your telegram ID" className="border shadow p-3 w-full rounded" onChange={handleChange} value={telegramID} />
         
         </div>

         <div className="mb-5">
           <label  className="block mb-2 font-bold text-gray-600">Twitter Handle  </label>
           <input type="text" name="twitterHandle" placeholder="Put in your twitter handle" className="border shadow p-3 w-full rounded" onChange={handleChange} value={twitterHandle} />      
         </div>
      </div>
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



export default ApplyAsAnAttendant