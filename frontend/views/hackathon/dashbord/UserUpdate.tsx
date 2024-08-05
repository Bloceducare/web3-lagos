import { useState, useEffect } from "react";
import React from "react";
import SideBar from "@/components/hackathon-sidebar";



type UserData = {
    first_name: string;
    other_name: string;
    email: string;
    github_username: string;
    web3_knowledge: string;
    hacking_role: string;
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
    other_name: "",
    github_username: "",
    web3_knowledge: "",
    hacking_role: "",
};


export default function UpdateUser () {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false)
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
      };


    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
          setUser(JSON.parse(userData));
        }
        console.log(userData);
      }, []);

    const handleUpdate = async (e: React.FormEvent) => {
        setLoading(true)
        const yourToken = localStorage.getItem("token");

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
            setMessage("Profile succeefully updated. Please Go back to tema overview");
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




            <div className="text-black font-bold text-2xl">Profile Update</div>

            {message && (
          <div className={`fixed bottom-4 right-4 p-4 text-center text-white ${isSuccess ? 'bg-[#28a745]' : 'bg-[#dc3545]'} border rounded-md`}>
            {message}
          </div>
        )}

            <form onSubmit={handleUpdate}>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-x-6 sm:space-y-0">
            <div className="w-full sm:w-full">
              <label htmlFor="first_name" className="block mb-2 font-bold text-gray-600 my-8">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                onChange={handleChange}
                placeholder="John"
                className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E]"
                value={formData.first_name}
                required
              />
            </div>
            <div className="w-full sm:w-full">
              <label htmlFor="other_name" className="block mb-2 font-bold text-gray-600 my-8">
                Other Names
              </label>
              <input
                type="text"
                id="other_name"
                name="other_name"
                onChange={handleChange}
                placeholder="Jullie Doe"
                className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E]"
                value={formData.other_name}
                required
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-x-6 sm:space-y-0">
            <div className="w-full sm:w-full">
              <label htmlFor="first_name" className="block mb-2 font-bold text-gray-600 my-8">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                onChange={handleChange}
                placeholder="John"
                className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E]"
                value={formData.email}
                required
              />
            </div>
            <div className="w-full sm:w-full">
              <label htmlFor="other_name" className="block mb-2 font-bold text-gray-600 my-8">
                Github Username
              </label>
              <input
                type="text"
                id="github_username"
                name="github_username"
                onChange={handleChange}
                placeholder="Jullie Doe"
                className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E]"
                value={formData.github_username}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="web3_knowledge" className="block mb-2 font-bold text-gray-600 my-4">
              Web3 Knowledge
            </label>
            <select
              id="web3_knowledge"
              name="web3_knowledge"
              onChange={handleChange}
              value={formData.web3_knowledge}
              className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E]"
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
          <div className="mb-16 ">
            <label htmlFor="hacking_role" className="block mb-2 font-bold text-gray-600 my-4">
              Hacking Role
            </label>
            <select
              id="hacking_role"
              name="hacking_role"
              onChange={handleChange}
              value={formData.hacking_role}
              className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E]"
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


          <button
            type="submit"
            className={`w-full p-5 bg-[#1E1E1E] text-center shadow-[-5px_-5px_0px_0px_#0096FF] text-white font-bold rounded-lg hover:bg-green-600 transition duration-300"
              }`}
          >
            {loading ? "Updating" : "Update Account"}
          </button>




            </form>



        </div>
    )

}