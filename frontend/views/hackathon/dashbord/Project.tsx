import React, { useEffect, useState } from 'react';
import SideBar from "@/components/hackathon-sidebar";
import HackathonHeader from "@/components/hackathon-header";
import { useRouter } from 'next/router';

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
  const [showButtons, setShowButtons] = useState(false);
  const [projectDetail, setProjectDetail] = useState(false);
  const [teamData, setTeamData] = useState<any | null>(null);
  const [creatorID, setCreatorID] = useState<number | null>(null);
  const [isCreator, setIsCreator] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const userData: any = localStorage.getItem("user");
    if (!userData) {
      router.push("/hackathon/login");
    } else {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
        router.push("/hackathon/login");
      }
    }
  }, [router]);

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
            setTeamData(null);
            setMessage("Create or join a team to be able to submit a project.");
          } else {
            setCreatorID(data[0].creator);
            setTeamData(data[0]);
            if (data[0].projects && data[0].projects.length > 0) {
              setFormData(data[0].projects[0]);
              setProjectDetail(true);
            } else {
              setProjectDetail(false);
            }
            if (data[0].creator === users.id) {
              setIsCreator(true);
            }
          }
        } else {
          console.log('No user data found in localStorage');
        }
      }
    };
    renderData();
  }, [router]);

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
      setFormData(data);
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

    if (formData) {
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
        setIsSuccess(true);
      } else {
        setErrors(data);
        setMessage("Unable to update, Please try again");
        setIsSuccess(false);      
      }
    } else {
      setMessage("Sorry, something went wrong Try again");
    }

    setLoading(false);
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrors(initialFormErrors);
    const yourToken = localStorage.getItem("token");

    if (isCreator) {
      const response = await fetch(
        `https://web3lagosbackend.onrender.com/hackathon/teams/${teamData?.id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${yourToken}`,
          },
        }
      );

      const result = await response.json();
      if (response.ok) {
        setMessage("Project Deleted");
        setFormData(initialFormState);
        setIsSuccess(true);
      } else {
        setErrors(result);
        setMessage("Unable to Delete Project, Please try again");
        setIsSuccess(false);      
      }
    } else {
      setMessage("Sorry, only team creators are allowed to delete the project.");
    }

    setLoading(false);
  };

  const handleLeaveTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const yourToken = localStorage.getItem("token");

    const response = await fetch(
      `https://web3lagosbackend.onrender.com/hackathon/teams/leave/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${yourToken}`,
        },
      }
    );

    const data = await response.json();
    if (response.ok) {
      setMessage(`You have successfully left ${teamData?.name} team.`);
      setFormData(initialFormState);
      setIsSuccess(true);
    } else {
      setErrors(data);
      setMessage(`Unable to leave ${teamData?.name} Team, Try again later`);
      setIsSuccess(false);      
    }

    setLoading(false);
  };

  return (
    <div className='flex w-full min-h-screen sm:px-0'>
      <div className="sm:w-1/5 z-50 px-2 h-full sm:flex">
        <SideBar />
      </div>
      <section className="flex flex-col w-full mt-8 px-4 sm:px-8 ">
        <div className="w-full bg-[#fff]">
          <HackathonHeader user={user} />
        </div>
        <section>
          <h1 className='text-3xl font-bold mt-5'>  {teamData ? "Project Overview" : "Project Submission"}</h1>
        </section>

        {message && (
          <div className={`fixed bottom-4 right-4 p-4 text-center text-white ${isSuccess ? 'bg-[#28a745]' : 'bg-[#dc3545]'} border rounded-md`}>
            {message}
          </div>
        )}

        {!teamData && (
          <div className='mt-5 text-xl text-[#dc3545]'>
            Create or join a team to be able to submit a project.
          </div>
        )}

        {teamData && teamData.projects.length === 0 && (
          <form onSubmit={handleSubmit} className='mb-8'>
            <div className='w-full mt-7'>
              <label>Project</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="E.g Smart Contract"
                className="w-full p-4 border border-[#1E1E1E] shadow-[4px_4px_0px_0px_[#1E1E1E]] mt-3"
                value={formData.name}
                required
              />
              {errors.name && <p className="text-[#dc3545]">{errors.name.join(", ")}</p>}
            </div>
            <div className='w-full mt-7'>
              <label>Category</label>
              <select name="category" onChange={handleChange} value={formData.category} className="w-full p-4 border appearance-none border-[#1E1E1E] shadow-[4px_4px_0px_0px_#1E1E1E] mt-3">
                <option value="">Select A category</option>
                <option value="Open Governance in the Africa Electoral Process">Application in open Governance in the Africa Electoral Process</option>
                <option value="Entertainment and media">Application in Entertainment and media</option>
                <option value="Real World Assets">Real World Assets</option>
                <option value="Digital collectibles">Application in digital collectibles</option>
                <option value="Financial inclusion and education">Application in financial inclusion and education</option>
                <option value="Sustainability">Application in sustainability</option>
                <option value="E-Identity">E - Identity</option>
              </select>
              {errors.category && <p className="text-[#dc3545]">{errors.category.join(", ")}</p>}
            </div>
            <div className='w-full mt-7'>
              <label>Description</label>
              <input
                type="text"
                name="description"
                onChange={handleChange}
                placeholder="Description of your project"
                className="w-full p-4 border border-[#1E1E1E] shadow-[4px_4px_0px_0px_#1E1E1E] mt-3"
                value={formData.description}
                required
              />
              {errors.description && <p className="text-[#dc3545]">{errors.description.join(", ")}</p>}
            </div>
            <div className='w-full mt-7'>
              <label>Live Link</label>
              <input
                type="text"
                name="live_link"
                onChange={handleChange}
                placeholder="https://web3bridge.com"
                className="w-full p-4 border border-[#1E1E1E] shadow-[4px_4px_0px_0px_#1E1E1E] mt-3"
                value={formData.live_link}
                required
              />
              {errors.live_link && <p className="text-[#dc3545]">{errors.live_link.join(", ")}</p>}
            </div>
            <div className='w-full mt-7'>
              <label>Demo video</label>
              <input
                type="text"
                name="demo_video"
                onChange={handleChange}
                placeholder="https://www.youtube.com"
                className="w-full p-4 border border-[#1E1E1E] shadow-[4px_4px_0px_0px_#1E1E1E] mt-3"
                value={formData.demo_video}
                required
              />
              {errors.demo_video && <p className="text-[#dc3545]">{errors.demo_video.join(", ")}</p>}
            </div>
            <div className='w-full mt-7'>
              <label>GitHub Link</label>
              <input
                type="text"
                name="github_url"
                onChange={handleChange}
                placeholder="https://github.com/username/repository"
                className="w-full p-4 border border-[#1E1E1E] shadow-[4px_4px_0px_0px_#1E1E1E] mt-3"
                value={formData.github_url}
                required
              />
              {errors.github_url && <p className="text-[#dc3545]">{errors.github_url.join(", ")}</p>}
            </div>
            <div className='w-full mt-7'>
              <button
                type="submit"
                className="w-full mt-12 py-4 bg-[#1E1E1E] text-white text-xl text-center shadow-[-5px_-5px_0px_0px_#0096FF]"
                disabled={loading}
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>

          // <div className="text-[#ff0000] text-[1.5em] m-auto">Submission Closed</div>
        )}

        {teamData && teamData.projects.length > 0 && (
          <section>
            {projectDetail && (
              <section>
                <section className="flex flex-wrap gap-5 text-black mt-5 text-lg md:text-xl">
                  <div className="px-8 py-5 bg-[#0096FF] rounded-xl">
                    <p>Team Name: <b>{teamData.name}</b></p>
                  </div>
                  <div className="px-8 py-5 bg-[#0096FF] rounded-xl">
                    <p>Project Name: <b>{formData.name}</b></p>
                  </div>
                  <div className="px-8 py-5 bg-[#0096FF] rounded-xl">
                    <p>Category: <b>{formData.category}</b></p>
                  </div>
                  <div className="px-8 py-5 bg-[#0096FF] rounded-xl">
                    <p>Description: <b>{formData.description}</b></p>
                  </div>
                  <div className="px-8 py-5 bg-[#0096FF] rounded-xl">
                    <p>Live Link: <b><a href={formData.live_link} target="_blank" rel="noopener noreferrer">{formData.live_link}</a></b></p>
                  </div>
                  <div className="px-8 py-5 bg-[#0096FF] rounded-xl">
                    <p>Demo Video: <b><a href={formData.demo_video} target="_blank" rel="noopener noreferrer">{formData.demo_video}</a></b></p>
                  </div>
                  <div className="px-8 py-5 bg-[#0096FF] rounded-xl">
                    <p>GitHub URL: <b><a href={formData.github_url} target="_blank" rel="noopener noreferrer">{formData.github_url}</a></b></p>
                  </div>
                </section>
                <section className='flex flex-wrap gap-10 pb-8'>
                  <div>
                    <button className="w-[100%] mt-12 p-6 bg-[#1E1E1E] text-white text-xl text-center shadow-[-5px_-5px_0px_0px_#0096FF]" onClick={() => setProjectDetail(false)}>
                      Update your project
                    </button>
                  </div>
                  {!isCreator && (
                    <div>
                      <button className="w-[100%] mt-12 p-6 bg-[#1E1E1E] text-white text-xl text-center shadow-[-5px_-5px_0px_0px_#0096FF]" onClick={handleLeaveTeam}>
                        Leave team
                      </button>
                    </div>
                  )}
                </section>
              </section>
            )}
            {!projectDetail && (
              <form onSubmit={handleUpdate}>
                <div className='w-full mt-7'>
                  <label>Project</label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleUpdateChange}
                    placeholder="E.g Smart Contract"
                    className="w-full p-4 border border-[#1E1E1E] shadow-[4px_4px_0px_0px_[#1E1E1E]] mt-3"
                    value={formData.name}
                    required
                  />
                  {errors.name && <p className="text-[#dc3545]">{errors.name.join(", ")}</p>}
                </div>
                <div className='w-full mt-7'>
                  <label>Category</label>
                  <select name="category" onChange={handleUpdateChange} value={formData.category} className="w-full p-4 border appearance-none border-[#1E1E1E] shadow-[4px_4px_0px_0px_[#1E1E1E]] mt-3">
                    <option value="Open Governance in the Africa Electoral Process">Application in open Governance in the Africa Electoral Process</option>
                    <option value="Entertainment and media">Application in Entertainment and media</option>
                    <option value="Real World Assets">Application in Real World Assets</option>
                    <option value="Digital collectibles">Application in digital collectibles</option>
                    <option value="Financial inclusion and education">Application in financial inclusion and education</option>
                    <option value="Sustainability">Application in sustainability</option>
                  </select>
                  {errors.category && <p className="text-[#dc3545]">{errors.category.join(", ")}</p>}
                </div>
                <div className='w-full mt-7'>
                  <label>Project description</label>
                  <input
                    type="text"
                    className="w-full p-4 border border-[#1E1E1E] shadow-[4px_4px_0px_0px_[#1E1E1E]] mt-3"
                    onChange={handleUpdateChange}
                    name="description"
                    value={formData.description}
                  />
                  {errors.description && <p className="text-[#dc3545]">{errors.description.join(", ")}</p>}
                </div>
                <div className='w-full mt-7'>
                  <label>Github repository URL</label>
                  <input
                    type="text"
                    name="github_url"
                    onChange={handleUpdateChange}
                    value={formData.github_url}
                    placeholder="Link to Github Repository"
                    className="w-full p-4 border border-[#1E1E1E] shadow-[4px_4px_0px_0px_[#1E1E1E]] mt-3"
                    required
                  />
                  {errors.github_url && <p className="text-[#dc3545]">{errors.github_url.join(", ")}</p>}
                </div>
                <div className='w-full mt-7'>
                  <label>Live Link URL</label>
                  <input
                    type="text"
                    name="live_link"
                    onChange={handleUpdateChange}
                    value={formData.live_link}
                    placeholder="Link to Live app/Website"
                    className="w-full p-4 border border-[#1E1E1E] shadow-[4px_4px_0px_0px_[#1E1E1E]] mt-3"
                    required
                  />
                  {errors.live_link && <p className="text-[#dc3545]">{errors.live_link.join(", ")}</p>}
                </div>
                <div className='w-full mt-7'>
                  <label>Demo video URL</label>
                  <input
                    type="text"
                    name="demo_video"
                    onChange={handleUpdateChange}
                    value={formData.demo_video}
                    placeholder="Link to Project Demo video"
                    className="w-full p-4 border border-[#1E1E1E] shadow-[4px_4px_0px_0px_[#1E1E1E]] mt-3"
                    required
                  />
                  {errors.demo_video && <p className="text-[#dc3545]">{errors.demo_video.join(", ")}</p>}
                  {showButtons && (
                    <div className='flex justify-between w-full gap-10'>
                      <button
                        type="submit"
                        className="w-[80%] mt-12 p-6 bg-[#1E1E1E] text-white text-xl text-center shadow-[-5px_-5px_0px_0px_#0096FF]"
                        disabled={loading}
                      >
                        {loading ? "Loading..." : "Update"}
                      </button>
                      {isCreator && (
                        <button
                          onClick={handleDelete}
                          className="w-[15%] mt-12 p-4 bg-[#FF0000] text-white text-xl text-center shadow-[-5px_-5px_0px_0px_#0096FF]"
                          disabled={loading}
                        >
                          {loading ? "Loading..." : "Delete"}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </form>
            )}
          </section>
        )}
      </section>
    </div>
  );
};

export default Project;
