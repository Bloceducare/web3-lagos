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
  const [showButtons, setShowButtons] = useState(false);
  const [showProject, setShowProject] = useState(false);
  const [creatorID, setCreatorID] = useState<number | null>(null);
  const [isCreator, setIsCreator] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const renderData = async () => {
      if (typeof window !== 'undefined') {
        const yourToken = localStorage.getItem('token');
        const userString = localStorage.getItem('user');
        if (userString && yourToken) {
          const users = JSON.parse(userString);
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
          if (Array.isArray(data) && data.length === 0) {
            setShowProject(false);
          } else {
            const team = data[0];
            setCreatorID(team.creator);
            if (team.project) {
              setFormData(team.project);
              setShowProject(true);
              if (team.creator === users.id) {
                setIsCreator(true);
              }
            } else {
              setShowProject(false);
            }
          }
        } else {
          console.log('No user data found in localStorage');
        }
      }
    };
    renderData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
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
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: undefined,
    });
    setShowButtons(true);
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
    if (response.ok) {
      setMessage("Created Successfully");
      setFormData(initialFormState);
      setIsSuccess(true);
    } else {
      setErrors(data);
      setMessage(data.error);
      setIsSuccess(false);
    }

    setLoading(false);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrors(initialFormErrors);
    const yourToken = localStorage.getItem("token");
    if (creatorID === user?.id) {
      const filteredFormData = Object.keys(formData).reduce((acc, key) => {
        if (formData[key] !== null && formData[key] !== "") {
          acc[key] = formData[key];
        }
        return acc;
      }, {} as FormData);
      const response = await fetch(
        `https://web3lagosbackend.onrender.com/hackathon/project/${formData.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${yourToken}`,
          },
          body: JSON.stringify(filteredFormData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setMessage("Project Updated Successfully");
        setFormData(initialFormState);
        setIsSuccess(true);
      } else {
        setErrors(data);
        setMessage("Unable to update, Please try again");
        setIsSuccess(false);
      }
    } else {
      setMessage("Sorry you can't update a project. Only team creators are allowed to do that ");
    }
    setLoading(false);
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrors(initialFormErrors);
    const yourToken = localStorage.getItem("token");
    if (creatorID === user?.id) {
      const response = await fetch(
        `https://web3lagosbackend.onrender.com/hackathon/project/${formData.id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${yourToken}`,
          },
        }
      );
      if (response.ok) {
        setMessage("Project Deleted");
        setFormData(initialFormState);
        setIsSuccess(true);
      } else {
        const data = await response.json();
        setErrors(data);
        setMessage("Unable to Delete Project, Please try again");
        setIsSuccess(false);
      }
    } else {
      setMessage("Sorry you can't delete a project. Only team creators are allowed to do that ");
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
          <h1 className='text-3xl font-bold mt-5'>{showProject ? "Project Update" : "Project Submission / Overview"}</h1>
        </section>

        {/* Display Success or Error Message */}
        {message && (
          <div
            className={`mt-4 p-4 text-center text-black ${isSuccess ? 'bg-green-500' : 'bg-red-500'} border rounded-md`}
          >
            {message}
          </div>
        )}

        {!showProject && (
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
                <option value="Open Governance in the Africa Electoral Process">Application in open Governance in the Africa Electoral Process</option>
                <option value="Entertainment and media">Application in Entertainment and media</option>
                <option value="Digital collectibles">Application in digital collectibles</option>
                <option value="Financial inclusion and education">Application in financial inclusion and education</option>
                <option value="Sustainability">Application in sustainability</option>
              </select>
            </div>
            <div className='w-full mt-7'>
              <label>Description</label>
              <input
                type="text"
                name="description"
                onChange={handleChange}
                placeholder="Description of your project"
                className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E] mt-3"
                value={formData.description}
                required
              />
            </div>
            <div className='w-full mt-7'>
              <label>Live Link</label>
              <input
                type="text"
                name="live_link"
                onChange={handleChange}
                placeholder="https://web3bridge.com"
                className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E] mt-3"
                value={formData.live_link}
                required
              />
            </div>
            <div className='w-full mt-7'>
              <label>Demo video</label>
              <input
                type="text"
                name="demo_video"
                onChange={handleChange}
                placeholder="https://www.youtube.com"
                className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E] mt-3"
                value={formData.demo_video}
                required
              />
            </div>
            <div className='w-full mt-7'>
              <label>GitHub Link</label>
              <input
                type="text"
                name="github_url"
                onChange={handleChange}
                placeholder="https://github.com/username/repository"
                className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E] mt-3"
                value={formData.github_url}
                required
              />
            </div>
            <div className='w-full mt-7'>
              <button
                type="submit"
                className="bg-black text-white p-4 w-full shadow-[4px_4px_0px_0px_#1E1E1E]"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Project"}
              </button>
            </div>
          </form>
        )}

        {showProject && (
          <form onSubmit={handleUpdate}>
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
                <option value="Open Governance in the Africa Electoral Process">Application in open Governance in the Africa Electoral Process</option>
                <option value="Entertainment and media">Application in Entertainment and media</option>
                <option value="Digital collectibles">Application in digital collectibles</option>
                <option value="Financial inclusion and education">Application in financial inclusion and education</option>
                <option value="Sustainability">Application in sustainability</option>
              </select>
            </div>
            <div className='w-full mt-7'>
              <label>Description</label>
              <input
                type="text"
                name="description"
                onChange={handleUpdateChange}
                placeholder="Description of your project"
                className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E] mt-3"
                value={formData.description}
                required
              />
            </div>
            <div className='w-full mt-7'>
              <label>Live Link</label>
              <input
                type="text"
                name="live_link"
                onChange={handleUpdateChange}
                placeholder="https://web3bridge.com"
                className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E] mt-3"
                value={formData.live_link}
                required
              />
            </div>
            <div className='w-full mt-7'>
              <label>Demo video</label>
              <input
                type="text"
                name="demo_video"
                onChange={handleUpdateChange}
                placeholder="https://www.youtube.com"
                className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E] mt-3"
                value={formData.demo_video}
                required
              />
            </div>
            <div className='w-full mt-7'>
              <label>GitHub Link</label>
              <input
                type="text"
                name="github_url"
                onChange={handleUpdateChange}
                placeholder="https://github.com/username/repository"
                className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E] mt-3"
                value={formData.github_url}
                required
              />
            </div>
            {showButtons && (
              <>
                <div className='w-full mt-7'>
                  <button
                    type="submit"
                    className="bg-black text-white p-4 w-full shadow-[4px_4px_0px_0px_#1E1E1E]"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update Project"}
                  </button>
                </div>
                <div className='w-full mt-7'>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="bg-red-600 text-white p-4 w-full shadow-[4px_4px_0px_0px_#1E1E1E]"
                    disabled={loading}
                  >
                    {loading ? "Deleting..." : "Delete Project"}
                  </button>
                </div>
              </>
            )}
          </form>
        )}
      </section>
    </div>
  );
};

export default Project;
