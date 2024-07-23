import React, { useEffect, useState } from 'react';
import SideBar from "@/components/hackathon-sidebar";
import HackathonHeader from "@/components/hackathon-header";

type User = {
  email: string;
  id: number;
  first_name: string;
  github_username: string;
  other_name: string;
};

type Project = {
  name: string;
  category: string;
  description: string;
  live_link: string;
  demo_video: string;
  github_url: string;
};

type FormErrors = {
  [key in keyof Project]?: string[];
};

const initialFormState: Project = {
  name: "",
  category: "",
  description: "",
  live_link: "",
  demo_video: "",
  github_url: ""
};

const initialFormErrors: FormErrors = {};

const Project: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<Project>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>(initialFormErrors);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    console.log(userData);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: undefined,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrors(initialFormErrors);
    const yourToken = localStorage.getItem("token");

    const response = await fetch(
      "https://web3lagosbackend.onrender.com/hackathon/project/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${yourToken}`,
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();
    console.log(data);


    if (response.ok) {
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      setMessage("Created Successfully");
      setFormData(initialFormState);
      setIsSuccess(true);
    } else {
      setErrors(data);
      setMessage("Please check your details and try again.");
      setIsSuccess(false);      
    }

    setLoading(false);
  };

  return (
    <div className='flex mt-[5rem] mb-5 px-4 sm:px-0'>
      <div className="sm:w-1/5 sm:fixed h-full sm:flex hidden">
        <SideBar />
      </div>
      <section className="flex flex-col sm:w-4/5 sm:ml-[20%] w-full  sm:px-8 ">
        <div className="w-full">
          <HackathonHeader user={user} />
        </div>
        <section>
          <h1 className='text-3xl font-bold mt-5'>Project Submission / Overview</h1>
        </section>

        {/* Display Success or Error Message */}
        {message && (
          <div
            className={`mt-4 p-4 text-center text-black ${isSuccess ? 'bg-green-500' : 'bg-red-500'} border rounded-md`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className='w-full mt-7'>
            <label>Project</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="E.g Smart Contract"
              className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E] mt-3"
              value={formData.name}
              required
            />
          </div>
          <div className='w-full mt-7'>
            <label>Category</label>
            <select name="category" onChange={handleChange} value={formData.category} className="w-full p-4 border  border-black shadow-[4px_4px_0px_0px_#1E1E1E] mt-3">
              <option value="Tech" >Application in open Governance in the Africa Electoral Process</option>
              <option value="Concert">Application in Entertainment and media</option>
              <option value="Dinner">Application in digital collectibles</option>
              <option value="Beauty pagent">Application in financial inclusion and education</option>
              <option value="Innovation">Application in e-identity and verification</option>
            </select>
          </div>
          <div className='w-full mt-7'>
            <label>Project description</label>
            <input
              type="text"
              className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E] mt-3"
              onChange={handleChange}
              name="description"
              value={formData.description}
            />
          </div>
          <div className='w-full mt-7'>
            <label>Github repository URL</label>
            <input
              type="text"
              name="github_url"
              onChange={handleChange}
              value={formData.github_url}
              placeholder="Link to Github Repository"
              className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E] mt-3"
              required
            />
          </div>
          <div className='w-full mt-7'>
            <label>Live Link URL</label>
            <input
              type="text"
              name="live_link"
              onChange={handleChange}
              value={formData.live_link}
              placeholder="Link to Live app/Website"
              className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E] mt-3"
              required
            />
          </div>
          <div className='w-full mt-7'>
            <label>Demo video URL</label>
            <input
              type="text"
              name="demo_video"
              onChange={handleChange}
              value={formData.demo_video}
              placeholder="Link to Project Demo video"
              className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E] mt-3"
              required
            />
            <div className='w-[50%]'>
              <button
                type="submit"
                className="w-full mt-12 p-6 bg-[#1E1E1E] text-white text-xl text-center shadow-[-5px_-5px_0px_0px_#0096FF]"
                disabled={loading}
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Project;
