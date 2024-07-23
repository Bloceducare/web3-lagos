import React, { useEffect, useState } from 'react'
import SideBar from "@/components/hackathon-sidebar";
import HackathonHeader from "@/components/hackathon-header";


type User = {
  email: string;
  id: number;
  first_name: string;
  github_username: string;
  other_name: string;
};

const Project: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    console.log(userData);
  }, []);
    return (
      <div className='flex  mt-[5rem] mb-5 px-4 sm:px-0'>

     <div className="sm:w-[27%] h-full sm:flex hidden">
        <SideBar />
      </div>

        <section className="flex flex-col sm:w-4/5  w-full  sm:px-8 ">
        <div className="w-full">
          <HackathonHeader user={user} />
        </div>
        <section>
            <h1 className='text-3xl font-bold mt-5'>Project Submission / Overview</h1>
        </section>

        <form>
            <div className='w-full mt-7'>
                <label>Project</label>
                <input
              type="text"
              id="twitter"
              name="email"
              placeholder="E.g Smart Contract"
              className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E] mt-3"
              required
            />
            </div>
            <div className='w-full mt-7'>
                <label>Category</label>
            <select name="category" id="" className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E] mt-3">
                <option value="Tech">Tech</option>
                <option value="Concert">Concert</option>
                <option value="Dinner">Dinner</option>
                <option value="Beauty pagent">Beauty pagent</option>
                <option value="Innovation" >Innovation</option>
            </select>
            </div>
            <div className='w-full mt-7'>
                <label>Project description</label>
                <textarea  placeholder="Write a short description of your project"
              className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E] mt-3"
              required>
              </textarea>
            </div>
            <div className='w-full mt-7'>
                <label>Github repository URL</label>
                <input
              type="text"
              id="twitter"
              name="email"
              placeholder="Link to Github Repository"
              className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E] mt-3"
              required
            />
            </div>
            <div className='w-full mt-7'>
                <label>Live Link URL</label>
                <input
              type="text"
              id="twitter"
              name="email"
              placeholder="Link to Live app/Website"
              className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E] mt-3"
              required
            />
            </div>
            <div className='w-full mt-7'>
                <label>Demo video URL</label>
                <input
              type="text"
              id="twitter"
              name="email"
              placeholder="Link to Project Demo video"
              className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E] mt-3"
              required
            />
            <div className='w-[30%]'>
            <button
              type="submit"
              className="  w-full mt-12 p-6  bg-[#1E1E1E]  text-white text-xl  text-center shadow-[-5px_-5px_0px_0px_#0096FF] "
            >
                Submit
            </button>
            </div>
            </div>
        </form>
        </section>
      </div>
    );
  };
  
  export default Project;