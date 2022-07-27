import { useState } from "react"
import axios from 'axios'


type ISponsor = {
userName:string,
email:string,
telegramID:string,
twitterHandle:string,
companyName:string,
companyLocation:string,
type:string
whyAcceptAsSponsor:string,
otherWaysOfSponsoring:string,
sponsorAmtRange:string,
whatToSponsor:string

}
const defaultUserInput = {
userName:'',
email:'',
telegramID:'',
twitterHandle:'',
companyName:'',
companyLocation:'',
type:'sponsor',
whyAcceptAsSponsor:"",
otherWaysOfSponsoring:"",
sponsorAmtRange:"",
whatToSponsor:""

}
type DetailedHTMLProps = /*unresolved*/ any
const ApplyAsaSponsor = ()=>{
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
    companyLocation,
    whyAcceptAsSponsor,
    otherWaysOfSponsoring
    } = userInputs
    
    const handleChange=(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>)=>{
        const {name, value} = e.target
      setUserInputs((prev)=>({
        ...prev,
        [name]:value
      }))
    }


    const postData = async (data:ISponsor)=>{
        const subData = {...data}
        setDataStatus(()=>({
          error:'',
          crud:true
         }))
     
        try {
            const result  = await axios.post('/api/participant', subData)
            setMessage(result.data.message)

            setDataStatus(()=>({
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
   <h1 className="text-3xl  font-semibold text-gray-800">Sponsors' Application</h1>
 {!!dataStatus.error &&  <span className="  text-red-500">{dataStatus.error}</span>}

   </div>
            <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
      {
        !(!!message) && (<>
        
        <form onSubmit={handleSubmit}>
         <div className="mb-5">
           <label htmlFor="userName" className="block mb-2 font-bold text-gray-600">Name <span className="text-red-600">* </span></label>
           <input type="text" id="name" name="userName" onChange={handleChange} 
           placeholder="Put in your fullname." className="border border-gray-300 shadow p-3 w-full rounded mb-"
           value={userName} />
         </div>

         <div className="mb-5">
           <label htmlFor="twitter" className="block mb-2 font-bold text-gray-600">Email <span className="text-red-600">*</span>  </label>
           <input type="email" id="twitter" name="email" onChange={handleChange} placeholder="Put in your name."className="border shadow p-3 w-full rounded"  value={email} />
           {/* border-red-300  */}
           {/* <p className="text-sm text-red-400 mt-2">Email is required</p> */}
         </div>
         <div className="mb-5">
           <label className="block mb-2 font-bold text-gray-600">Which company, protocol or DAO do you work for? <span className="text-red-600">*</span>   </label>
           <input type="text"  name="companyName" placeholder="Put in your company or protocol name." className="border shadow p-3 w-full rounded" onChange={handleChange} value={companyName}  />
         
         </div>


         <div className="mb-5">
           <label className="block mb-2 font-bold text-gray-600">Where Is Your Company Registered Location  </label>
           <input type="text"  name="companyLocation" placeholder="Put in your location." className="border shadow p-3 w-full rounded" onChange={handleChange} value={companyLocation}  />
         
         </div>

         <div className="mb-5">

<label className="block mb-2 font-bold text-gray-600">Why do you think that we should accept you as a sponsor?  <span className="text-red-600">*</span>  </label>
<textarea name='whyAcceptAsSponsor' value={whyAcceptAsSponsor} onChange={handleChange} className="rounded p-3 shadow border form-textarea mt-1 block w-full" rows={2} placeholder="Enter some long form content."></textarea>

</div>
         <div className="mb-5">

<label className="block mb-2 font-bold text-gray-600">How else do you think that you can help ETHLagos apart from sponsoring the main event?  <span className="text-red-600">*</span>  </label>
<textarea name='otherWaysOfSponsoring' value={otherWaysOfSponsoring} onChange={handleChange} className="rounded p-3 shadow border form-textarea mt-1 block w-full" rows={2} placeholder="Enter some long form content."></textarea>

</div>


<div className="mb-5 ">

<label  className="block mb-2 font-bold text-gray-600"> What could be the range of your sponsorship?</label>
<div className="mt-2 p-3 flex items-center" >
<div className="mr-6">
<label className="inline-flex items-center">
<input type="radio" className="form-radio" name="sponsorAmtRange" value='50k-100k' onChange={handleChange} />
<span className="ml-2">50k-100k</span>
</label>
</div>
<div className="mr-6">
<label className="inline-flex items-center">
<input type="radio" className="form-radio" name="sponsorAmtRange" value='100k-300k' onChange={handleChange} />
<span className="ml-2">100k-300k</span>
</label>
</div>
<div className="mr-6">
<label className="inline-flex items-center">
<input type="radio" className="form-radio" name="sponsorAmtRange" value='300k-500k' onChange={handleChange} />
<span className="ml-2">300k-500k</span>
</label>
</div>

<div>
<label className="inline-flex items-center">
<input type="radio" className="form-radio" name="sponsorAmtRange" value='500k above' onChange={handleChange} />
<span className="ml-2">500k above</span>
</label>
</div>
</div>

</div>
<div className="mb-5 ">

<label  className="block mb-2 font-bold text-gray-600"> What would you like to sponsor? </label>
<div className="mt-2 p-3 flex items-center" >
<div className="mr-6">
<label className="inline-flex items-center">
<input type="radio" className="form-radio" name="whatToSponsor" value='main-event' onChange={handleChange} />
<span className="ml-2">Main Event</span>
</label>
</div>
<div className="mr-6">
<label className="inline-flex items-center">
<input type="radio" className="form-radio" name="whatToSponsor" value='hackatons' onChange={handleChange} />
<span className="ml-2">Hackatons</span>
</label>
</div>
<div className="mr-6">
<label className="inline-flex items-center">
<input type="radio" className="form-radio" name="whatToSponsor" value='trip' onChange={handleChange} />
<span className="ml-2">Trips</span>
</label>
</div>

<div>
<label className="inline-flex items-center">
<input type="radio" className="form-radio" name="whatToSponsor" value='others' onChange={handleChange} />
<span className="ml-2">Others</span>
</label>
</div>
</div>

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



export default ApplyAsaSponsor