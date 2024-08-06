import { useState, useEffect } from "react";
import React from "react";
import SideBar from "@/components/hackathon-sidebar";
import HackathonHeader from "@/components/hackathon-header";
import { BsPencil } from "react-icons/bs";
import { FaSave } from "react-icons/fa";
import Link from "next/link";



type UserData = {
    first_name: string;
    email: string;
    github_username: string;
    web3_knowledge: string,
    hacking_role: string
};

type User = {
    email: string;
    id: number;
    first_name: string;
    github_username: string;
    other_name: string;
};

type FormErrors = {
    [key in keyof UserData]?: string;
};
  
const initialFormState: UserData = {
    first_name: "",
    email: "",
    github_username: "",
    web3_knowledge: "",
    hacking_role: "",
};

const initialFormErrors: FormErrors = {};



export default function UpdateUser () {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false)
    const [change, setChange] = useState(false)
  const [formData, setFormData] = useState<UserData>(initialFormState);
  const [message, setMessage] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => {
          const updatedFormData = {
            ...prevFormData,
            [name]: value,
          };         
          return updatedFormData;
        });
        setChange(true)
      };


      const handleEdit = () => {
        setChange(true)
      }
    useEffect(() => {
        const userData = localStorage.getItem("user"); 
        if (userData) {
          setUser(JSON.parse(userData));
        }
        console.log(userData);
      }, []);

    const handleUpdate = async (e: React.FormEvent) => {
        const yourToken = localStorage.getItem("token");
        setLoading(true)
        const response = await fetch(
            `https://web3lagosbackend.onrender.com/hackathon/users/users/${user?.id}/`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${yourToken}`,
              },
              body: JSON.stringify(formData),
            }
          );

          if (response.ok) {
            const data = await response.json();
            setMessage("Profile succeefully updated. Please Go back to team overview");
            setChange(false)
            window.location.reload();
            setIsSuccess(true)
            window.location.href = "/hackathon/team";
          } else {
            setMessage("Failed to Update");
            setIsSuccess(false)
          }
        
        }

    return (
        <div  className='flex w-full h-full px-4 sm:px-0'>

             <div className="sm:w-1/5 fixed h-full sm:flex">
        <SideBar />
      </div>




            <section className="flex flex-col w-full mt-8 px-4 sm:px-8 ">
            <div className="w-full bg-[#fff]">
          <HackathonHeader user={user} />
        </div>

            {message && (
          <div className={`fixed bottom-4 right-4 p-4 text-center text-white ${isSuccess ? 'bg-[#28a745]' : 'bg-[#dc3545]'} border rounded-md`}>
            {message}
          </div>
        )}

                <div className="text-2xl">Personal Profile</div>
            <form onSubmit={handleUpdate}>
            <div className='w-full mt-7'>
              <label>
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                onChange={handleChange}
                placeholder="John doe"
                className="w-full p-4 border border-[#1E1E1E] shadow-[4px_4px_0px_0px_[#1E1E1E]] mt-3"
                value={formData.first_name}
                required
              />

            </div>

            <div className='w-full mt-7'>
              <label>
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                onChange={handleChange}
                placeholder="John"
                 className="w-full p-4 border border-[#1E1E1E] shadow-[4px_4px_0px_0px_[#1E1E1E]] mt-3"
                value={formData.email}
                required
              />
            </div>
            <div className='w-full mt-7'>
              <label>
                Github Username
              </label>
              <input
                type="text"
                id="github_username"
                name="github_username"
                onChange={handleChange}
                placeholder="Jullie Doe"
                className="w-full p-4 border border-[#1E1E1E] shadow-[4px_4px_0px_0px_[#1E1E1E]] mt-3"
                value={formData.github_username}
                required
              />
            </div>

            <div className='w-full mt-7'>
            <label htmlFor="web3_knowledge" className="block mb-2 font-bold text-gray-600 my-4">
              Web3 Knowledge
            </label>
            <select
              id="web3_knowledge"
              name="web3_knowledge"
              onChange={handleChange}
              value={formData.web3_knowledge}
              className="w-full p-4 border border-[#1E1E1E] shadow-[4px_4px_0px_0px_[#1E1E1E]] mt-3"
              required
            >
              <option value="" disabled>
                Select your knowledge level
              </option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>


          <div className='w-full mt-7'>
            <label htmlFor="hacking_role" className="block mb-2 font-bold text-gray-600 my-4">
              Hacking Role
            </label>
            <select
              id="hacking_role"
              name="hacking_role"
              onChange={handleChange}
              value={formData.hacking_role}
              className="w-full p-4 border border-[#1E1E1E] shadow-[4px_4px_0px_0px_[#1E1E1E]] mt-3"
              required
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Project Manager">Project Manager</option>
            </select>
          </div>






          <div className="flex gap-10">


       {!change && (   <button
            className={`w-full p-5 bg-[#1E1E1E] text-center shadow-[-5px_-5px_0px_0px_#0096FF] text-white font-bold rounded-lg hover:bg-green-600 transition duration-300"}`}
            onClick={handleEdit}
            >
             <span className="flex gap-2">Edit Info <BsPencil className="mt-1"/> </span>
          </button>)}

       {change && (   <button
            type="submit"
            className={`w-full p-5 bg-[#1E1E1E] text-center shadow-[-5px_-5px_0px_0px_#0096FF] text-white font-bold rounded-lg hover:bg-green-600 transition duration-300"}`}>
            {loading ? "Saving..." :  <span className="flex gap-2">Save <BsPencil className="mt-1"/> </span>}
          </button>)}

        <Link href="/hackathon/resetpassword"> <button  className={`w-full p-5 bg-[#1E1E1E] text-center shadow-[-5px_-5px_0px_0px_#0096FF] text-white font-bold rounded-lg hover:bg-green-600 transition duration-300"}`}>
            Reset Password
          </button></Link> 

          </div>



            </form>
            </section>



        </div>
    )

}