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

interface FormData {
  [key: string]: any;
}


type Project = {
  name: string;
  category: string;
  description: string;
  live_link: string;
  demo_video: string;
  github_url: string;
  id?: number;
  [key: string]: any; 
};

type FormErrors = {
  [key in keyof Project]?: string[];
};

const initialFormState: Project = {
  id: 0,
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
  const [showButtons, setShowButtons] = useState(false)
  const [projectDetail, setProjectDetail] = useState(false)
  const [data, setData] = useState<Project | null>(null);
  const [showProject, setShowProject] = useState(false)
  const [creatorID, setCreatorID] = useState()
  const [isCreator, setisCreator] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);


  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    console.log(userData);
  }, []);

  useEffect(() => {
    const renderData = async () => {
      if (typeof window !== 'undefined') {
        const yourToken = localStorage.getItem('token');
        const userString = localStorage.getItem('user')
        if (userString && yourToken) {
            const users = JSON.parse(userString)
            const response = await fetch(
              `https://web3lagosbackend.onrender.com/hackathon/teams/my-teams/`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${yourToken}`,
                },
              }
            );
            const data = await response.json();
            console.log(data[0])
            console.log(user?.id)
            if (Array.isArray(data) && data.length === 0) {
              setShowProject(false)
            } else {
              setCreatorID(data[0].creator)
              setShowProject(true)
              setData(data[0])
              setFormData(data[0].projects)
              setProjectDetail(true)
              if (creatorID === users.id) {
                 setisCreator(true)
              }
            }
        } else {
          console.log('No user data found in localStorage');
        }
      }
    };
    renderData();
  }, []);

  console.log(creatorID)

 

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
  const handleUpdateChange = (
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
    if (creatorID ===  user?.id) {
      setisCreator(true)
   }
    setShowButtons(true)
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrors(initialFormErrors);
    const yourToken = localStorage.getItem("token");
    const userString = localStorage.getItem('user')
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
      setFormData(data);
      setIsSuccess(true);
    } else {
      setErrors(data);
      setMessage(data.error);
      setIsSuccess(false);      
    }

    setLoading(false);
  };

  const handleUpdate = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrors(initialFormErrors);
    const yourToken = localStorage.getItem("token");
    const userString = localStorage.getItem('user'); 

    if (userString && yourToken) {
    const users = JSON.parse(userString);

    if (creatorID === users.id) {
      const filteredFormData = Object.keys(formData).reduce((acc, key) => {
        if (formData[key] !== null && formData[key] !== "") {
          acc[key] = formData[key];
        }
        return acc;
      }, {} as FormData);
      
    const response = await fetch(
      `https://web3lagosbackend.onrender.com/hackathon/project/${formData?.id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${yourToken}`,
        },
        body: JSON.stringify(filteredFormData),
      }
    );
    const datas = await response.json();
    console.log(datas);
    if (response.ok) {
      localStorage.setItem("token", datas.access_token);
      localStorage.setItem("user", JSON.stringify(datas.user));
      
      setMessage("Project Updated Successfully");
      setFormData(initialFormState);
      setIsSuccess(true);
      setProjectDetail(true)
    } else {
      setErrors(datas);
      setMessage("Unable to update, Please try again");
      setIsSuccess(false);      
    }
  } else {
    setMessage("Sorry you can't update a project. Only team creators are allowed to do that ")
  }
    setLoading(false);
  }
  }

  const handleDelete = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrors(initialFormErrors);
    const yourToken = localStorage.getItem("token");
    const userString = localStorage.getItem('user'); 

    if (userString && yourToken) {
    const users = JSON.parse(userString);

    if (creatorID === users.id) {      
    const response = await fetch(
     `https://web3lagosbackend.onrender.com/hackathon/teams/${formData.id}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${yourToken}`,
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      setMessage("Project Deleted");
      setFormData(initialFormState);
      setIsSuccess(true);
    } else {
      setErrors(data);
      setMessage("Unable to Delete Project, Please try again");
      setIsSuccess(false);      
    }
  } else {
    setMessage("Sorry you can't delete a project. Only team creators are allowed to do that ")
  }
    setLoading(false);
  }
  }

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
          <h1 className='text-3xl font-bold mt-5'>  {showProject ? "Project Update" : "Project Submission / Overview"}</h1>
        </section>

        {/* Display Success or Error Message */}
        {message && (
          <div
            className={`mt-4 p-4 text-center text-black ${isSuccess ? 'bg-green-500' : 'bg-red-500'} border rounded-md`}
          >
            {message}
          </div>
        )}

      {!showProject &&(  <form onSubmit={handleSubmit}>
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
              <option value="Open Governance in the Africa Electoral Process" >Application in open Governance in the Africa Electoral Process</option>
              <option value="Entertainment and media">Application in Entertainment and media</option>
              <option value="Digital collectibles">Application in digital collectibles</option>
              <option value="Financial inclusion and education">Application in financial inclusion and education</option>
              <option value="E-identity and verification">Application in e-identity and verification</option>
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
                {loading ? "Loading..." : "Create"}
              </button>
            </div>
          </div>
        </form>)}

        {showProject &&( 


<section>
          
       {projectDetail && (   <section>
        <section className="flex flex-wrap gap-5 text-white mt-5 text-lg md:text-xl">
               <div className="px-8 py-5 bg-[#0096FF] rounded-xl">
              <p>Team Name: <b>{data ? data.name : 'Null'}</b></p>
            </div>
            <div className="px-8 py-5 bg-[#0096FF] rounded-xl">
              <p>Number of Members: <b>{data ? data.members?.length : 'N/A'}</b></p>
            </div>
            <div className="px-8 py-5 bg-[#0096FF] rounded-xl">
              <p>Joining code: <b>{data ? data.joining_code : 'N/A'}</b></p>
            </div>
            </section>

            <div>
              <button className="w-[30%] mt-12 p-6 bg-[#1E1E1E] text-white text-xl text-center shadow-[-5px_-5px_0px_0px_#0096FF]" onClick={() => setProjectDetail(false)}>
              Update your project
              </button>
            </div>
            </section>
          )}
          
          
          
          
        {!projectDetail && (  <form onSubmit={handleUpdate}>
          <div className='w-full mt-7'>
            <label>Project</label>
            <input
              type="text"
              name="name"
              onChange={handleUpdateChange}
              placeholder="E.g Smart Contract"
              className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E] mt-3"
              value={formData.name}
              required
            />
          </div>
          <div className='w-full mt-7'>
            <label>Category</label>
            <select name="category" onChange={handleUpdateChange} value={formData.category} className="w-full p-4 border  border-black shadow-[4px_4px_0px_0px_#1E1E1E] mt-3">
              <option value="Open Governance in the Africa Electoral Process" >Application in open Governance in the Africa Electoral Process</option>
              <option value=" Entertainment and media">Application in Entertainment and media</option>
              <option value="Digital collectibles">Application in digital collectibles</option>
              <option value="Financial inclusion and education">Application in financial inclusion and education</option>
              <option value="E-identity and verification">Application in e-identity and verification</option>
            </select>
          </div>
          <div className='w-full mt-7'>
            <label>Project description</label>
            <input
              type="text"
              className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E] mt-3"
              onChange={handleUpdateChange}
              name="description"
              value={formData.description}
            />
          </div>
          <div className='w-full mt-7'>
            <label>Github repository URL</label>
            <input
              type="text"
              name="github_url"
              onChange={handleUpdateChange}
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
              onChange={handleUpdateChange}
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
              onChange={handleUpdateChange}
              value={formData.demo_video}
              placeholder="Link to Project Demo video"
              className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E] mt-3"
              required
            />
            {showButtons && (<div className='flex justify-between w-full gap-10'>
              <button
                type="submit"
                className="w-[80%] mt-12 p-6 bg-[#1E1E1E] text-white text-xl text-center shadow-[-5px_-5px_0px_0px_#0096FF]"
                disabled={loading}
              >
                {loading ? "Loading..." : "Update"}
              </button>

            {isCreator && (  <button
                onClick={handleDelete}
                className=" w-[15%] mt-12 p-4 bg-[#FF0000] text-white text-xl text-center shadow-[-5px_-5px_0px_0px_#0096FF]"
                disabled={loading}
              >
                {loading ? "Loading..." : "Delete"}
              </button>)}

            </div>)}
          </div>
        </form>)}
        
        </section>
        )}
      </section>
    </div>
  );
};

export default Project;
