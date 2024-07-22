import React, { useEffect, useState, ChangeEvent,  KeyboardEvent } from "react";
import EmailInput from "@/components/Email";



type TeamData = {
    name : string;
    creator : BigInteger;
    members : number[];
    joining_code: string;
}
type CreateTeam = {
  name : string
}
type TeamCode = {
  name : string
}
type FormErrors = {
    [key in keyof TeamData]?: string[];
};
const initialFormState: CreateTeam = {
    name : ""
};
const initialCodeState: TeamCode = {
  name : ""
};
  
  const initialFormErrors: FormErrors = {};

const Team: React.FC = () => {
    const [formData, setFormData] = useState<CreateTeam>(initialFormState);
    const [formCode, setFormCode] = useState<TeamCode>(initialCodeState)
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState<FormErrors>(initialFormErrors);
    const [data, setData] = useState<TeamData | null>(null)
    const [teamCreated, setTeamCreated] = useState(false);
    const [emails, setEmails] = useState<string[]>([]);
    const [input, setInput] = useState<string>('');

    console.log(formData)

   
     const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(name)
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: undefined,
    });
  };


  useEffect(() => {
    const renderData = async () => {
      if (typeof window !== 'undefined') {
        const userString = localStorage.getItem('user');
        const yourToken = localStorage.getItem('token')
        if (userString && yourToken) {
          const user = JSON.parse(userString);
          if (user && user.id) {
            const response = await fetch(
                `https://web3lagosbackend.onrender.com/hackathon/teams/${user.id}/`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                   "Authorization": `Bearer ${yourToken}`
                },
              }
            );
            const data = await response.json();
            setData(data)
            console.log('Response:', data);
            setTeamCreated(true)
          } else {
            console.error('User data is invalid or missing user.id');
          }
        } else {
          console.log('No user data found in localStorage');
        }
      }
    };
    renderData();
  }, []);

    const handleSubmit = async (e: React.FormEvent) => { 
      e.preventDefault();
        setLoading(true);
        setMessage("");
        setErrors(initialFormErrors);

        const yourToken = localStorage.getItem('token')
        console.log(yourToken)
        const response = await fetch(
            "https://web3lagosbackend.onrender.com/hackathon/teams/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                 "Authorization": `Bearer ${yourToken}`
              },
              body: JSON.stringify(formData),
            }
          );
          const data = await response.json();
          console.log(data)
          if (response.ok) {
            setTeamCreated(true)
            setFormData(initialFormState);
            setIsSuccess(true); 
          } else {
            setErrors(data);
          }
    }


    const handleJoinTeam = async () => {
      const yourToken = localStorage.getItem("token");
      const userString = localStorage.getItem("user");
  
      if (yourToken && userString) {
        const user = JSON.parse(userString);
        const response = await fetch(
          `https://web3lagosbackend.onrender.com/hackathon/teams/join/${user.id}/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${yourToken}`
            }
          }
        );
  
        if (response.ok) {
          const data = await response.json();
          setMessage("Successfully joined the team");
          setData(data);
        } else {
          setMessage("Failed to join the team");
        }
      } else {
        setMessage("No token or user data found");
      }
    };
  

    return(

        <div className='mt-14'>

        <section>
            <h1 className='text-3xl font-bold'>Team Overview</h1>
        </section>


        <section className="flex flex-wrap gap-5 text-white mt-5 text-lg md:text-xl">
      <div className="px-8 py-5 bg-[#0096FF] rounded-xl">
        <p>Team Name: <b>{data ? data.name : 'Null'}</b></p>
      </div>
      <div className="px-8 py-5 bg-[#0096FF] rounded-xl">
        <p>Number of Members: <b>{data ? data.members.length : 'Null'}</b></p>
      </div>
      <div className="px-8 py-5 bg-[#0096FF] rounded-xl">
        <p>Role: <b>Null</b></p>
      </div>
    </section>

        <section className="flex justify-center gap-5 w-[100%] sm:w-[50%] md:w-[70%] lg:w-[38%] px-1 py-1  my-16 border-2 border-black rounded-2xl">
            <div className="px-8 py-5 bg-[#1E1E1E] text-white rounded-xl">
                <p>  {teamCreated ? 'Invite to Team' : 'Create Team'} </p>
            </div>
            <div className="px-8 py-5  rounded-xl">
                <p>Join Team </p>
            </div>
        </section>


        <section>
          { teamCreated ?
            <form>
            <div className='w-[100%] sm:w-[70%] md:w-[60%] mt-7'>
                <label htmlFor="teamName" >Search email</label>
                <EmailInput emails={emails} setEmails={setEmails} />
              <div className="w-[100%] sm:w-[60%] md:w-[40%]">
           
           <button
           type="submit"
           className="w-full mt-12 p-6  bg-[#1E1E1E]  text-white text-xl  text-center shadow-[-5px_-5px_0px_0px_#0096FF] "
         >
            Send Invite
         </button>  
         </div>
         </div>
         </form>  :
<form onSubmit={handleSubmit}>
<div className='w-[100%] sm:w-[60%] md:w-[40%] mt-7'>
    <label htmlFor="teamName" >Team Name</label>
    <input
  type="text"
  id="twitter"
  name="name"
  onChange={handleChange}
  placeholder="E.g Smart Contract"
  className="w-full p-4 border text-black border-black shadow-[4px_4px_0px_0px_#1E1E1E] mt-3"
  value={formData.name}
  required
/>
<div className="w-[100%] sm:w-[60%] md:w-[40%]">
<button
type="submit"
className="w-full mt-12 p-6  bg-[#1E1E1E]  text-white text-xl  text-center shadow-[-5px_-5px_0px_0px_#0096FF] "
>
 Create Team
</button>

</div>
</div>
</form>
          }
           
        </section>
        </div>
    )
}

export default Team;