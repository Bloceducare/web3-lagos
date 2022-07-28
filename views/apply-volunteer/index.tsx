import { useState, useRef } from "react"
import axios from 'axios'


type Ivolunteer = {
userName:string,
email:string,
telegramID:string,
twitterHandle:string,
companyName:string,
location:string,
Im:string,
spokenAtWeb3Before:boolean
gender:string
type:string

}
const defaultUserInput = {
userName:'',
email:'',
telegramID:'',
twitterHandle:'',
companyName:'',
location:'',
Im:"",
spokenAtWeb3Before:false,
gender:"",
type:'volunteer'
}
type DetailedHTMLProps = /*unresolved*/ any
const ApplyAsaVolunteer = ()=>{
    const [userInputs, setUserInputs] = useState(defaultUserInput)
    const [dataStatus, setDataStatus] = useState({crud:false, error:''})
    const { crud } = dataStatus
    const [message, setMessage] = useState('')
    const ImRef = useRef<DetailedHTMLProps>()
    const  { 
    userName,
    email,
    telegramID,
    twitterHandle,
    companyName,
    location,
    Im,
    } = userInputs
    
    const handleChange=(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>)=>{
        const {name, value} = e.target
      setUserInputs((prev)=>({
        ...prev,
        [name]:value
      }))
    }


    const postData = async (data:Ivolunteer)=>{
        const subData = {...data, name:data.userName, spokenAtWeb3Before:!!data.spokenAtWeb3Before, Im:ImRef.current.value}
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
    
    return (<div className="mt-12">
   <div className="text-center">
   <h1 className="text-3xl  font-semibold text-gray-800">Volunteers' Application</h1>
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
           value={userName} />
         </div>

         <div className="mb-5">
           <label htmlFor="twitter" className="block mb-2 font-bold text-gray-600">Email <span className="text-red-600">*</span>  </label>
           <input type="email" id="twitter" name="email" onChange={handleChange} placeholder="Put in your name."className="border shadow p-3 w-full rounded"  value={email} />
           {/* border-red-300  */}
           {/* <p className="text-sm text-red-400 mt-2">Email is required</p> */}
         </div>
         <div className="mb-5">
           <label className="block mb-2 font-bold text-gray-600">Location <span className="text-red-600">*</span>   </label>
           <input type="text"  name="location" placeholder="Put in your location." className="border shadow p-3 w-full rounded" onChange={handleChange} value={location}  />
         
         </div>

         <div className="mb-5">

         <label className="block mb-2 font-bold text-gray-600">I'm  <span className="text-red-600">*</span>  </label>
         <input 
         ref={ImRef}
         list="Im" name="browser" id="browser" className='border p-3 w-full' placeholder="Type or Select an Option"/>
    <datalist id="Im">
    <option value="Studying" /> 
    <option value="Working" />
    <option value="looking for something new" />
    <option value="Retired" />
    <option value="Researching" />
  </datalist>


         </div>

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



export default ApplyAsaVolunteer