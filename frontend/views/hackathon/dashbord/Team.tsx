import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import EmailInput from "@/components/Email";
import SideBar from "@/components/hackathon-sidebar";
import HackathonHeader from "@/components/hackathon-header";
import UpdateUser from "./UserUpdate";
import team from "@/pages/hackathon/team";
import { useRouter } from "next/router";

type TeamData = {
  id: number;
  name: string;
  creator: BigInteger | null | undefined;
  members: number[];
  joining_code: string;
};

type User = {
  email: string;
  id: number;
  first_name: string;
  github_username: string;
  other_name: string;
};

type CreateTeam = {
  name: string;
};

type JoinTeam = {
  joining_code: string;
};

type FormErrors = {
  [key in keyof TeamData]?: string[];
};

const initialFormState: CreateTeam = {
  name: "",
};

const initialCodeState: JoinTeam = {
  joining_code: "",
};

const initialFormErrors: FormErrors = {};

const Team: React.FC = () => {
  const [formData, setFormData] = useState<CreateTeam>(initialFormState);
  const [formCode, setFormCode] = useState<JoinTeam>(initialCodeState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState<FormErrors>(initialFormErrors);
  const [data, setData] = useState<TeamData | null>(null);
  const [teamCreated, setTeamCreated] = useState(false);
  const [jointeam, setJoinTeam] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);
  const [userHasTeam, setUserHasTeam] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    console.log(userData);
    // console.log(user)
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(name);
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: undefined,
    });
  };

  const inviteLimit = 5 - (data?.members?.length || 0);

  const handleCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormCode({
      ...formCode,
      joining_code: e.target.value,
    });
  };

  useEffect(() => {
    const renderData = async () => {
      if (typeof window !== 'undefined') {
        const userString = localStorage.getItem('user');
        const yourToken = localStorage.getItem('token');
        if (userString && yourToken) {
          const user = JSON.parse(userString);
          if (user && user.id) {
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
            setData(data[0]);
            setUserHasTeam(data.length > 0);
            console.log('Response:', data);
            if (Array.isArray(data) && data.length === 0) {
              setTeamCreated(false);
            } else {
              setTeamCreated(true);
            }
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
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrors(initialFormErrors);

    const yourToken = localStorage.getItem('token');
    const response = await fetch(
      "https://web3lagosbackend.onrender.com/hackathon/teams/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${yourToken}`,
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      setTeamCreated(true);
      setData(data);
      setFormData(initialFormState);
      setIsSuccess(true);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 5000);
    } else {
      setErrors(data);
      setIsSuccess(false);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 5000);
    }
    setLoading(false);
  };

  const handleLeaveTeam = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const yourToken = localStorage.getItem("token");
    const userString = localStorage.getItem('user'); 

    if (userString && yourToken) {
      
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
    const datas = await response.json();
    console.log(datas);
    if (response.ok) {
      
      setMessage(`You have successfully left ${data?.name} team.`);
      setIsSuccess(true);
      window.location.reload();
    } else {
      setErrors(datas);
      setMessage(`Unable to leave ${data?.name} Team, Try again later`);
      setIsSuccess(false);      
    }
  } else {
    setMessage("something went wrong Try again Please ")
  }
    setLoading(false);
  }

  const handleDeleteTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const yourToken = localStorage.getItem("token");
  
    if (yourToken && data) {
      const response = await fetch(
        `https://web3lagosbackend.onrender.com/hackathon/teams/${data.id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${yourToken}`,
          },
        }
      );
      if (response.ok) {
        setMessage(`Team ${data.name} deleted successfully.`);
        setIsSuccess(true);
        setUserHasTeam(false);
        setData(null);
        window.location.reload();
      } else {
        setMessage(`Unable to delete ${data.name} team. Try again later.`);
        setIsSuccess(false);
      }
    } else {
      setMessage("Something went wrong. Please try again.");
      setIsSuccess(false);
    }
    setLoading(false);
  };
  const handleInviteSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const yourToken = localStorage.getItem("token");
    const userString = localStorage.getItem("user");

    if (yourToken && userString) {
      const user = JSON.parse(userString);
      const response = await fetch(
        `https://web3lagosbackend.onrender.com/hackathon/teams/${data?.id}/invite/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${yourToken}`,
          },
          body: JSON.stringify({ emails }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessage("Invitation sent");
        setEmails([]); // Clear emails after successful invite
        setIsSuccess(true);
      } else {
        setMessage("Failed to send invite");
        setIsSuccess(false);
      }
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 5000);
    } else {
      setMessage("No token or user data found");
      setIsSuccess(false);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 5000);
    }
  };

  const handleJoinTeam = async (e: FormEvent) => {
    const yourToken = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    e.preventDefault();

    if (yourToken && userString) {
      const response = await fetch(
        `https://web3lagosbackend.onrender.com/hackathon/teams/join/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${yourToken}`,
          },
          body: JSON.stringify(formCode),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessage("Successfully joined the team");
        window.location.reload();
      } else {
        setMessage("Failed to join the team");
        setIsSuccess(false);
      }
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 5000);
    } else {
      setMessage("No token or user data found");
      setIsSuccess(false);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 5000);
    }
  };

  return (
    <div className='flex w-full h-full px-4 sm:px-0'>
      <div className="sm:w-1/5 fixed h-full sm:flex">
        <SideBar />
      </div>

      <section className="flex flex-col sm:w-4/5 sm:ml-[20%] w-full mt-14 sm:px-8 ">
        <div className="w-full">
          <HackathonHeader user={user} />
        </div>
        <section>
          <h1 className='text-3xl font-bold mt-5'>Team Overview</h1>
        </section>

        {teamCreated && ( 
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
        )}

{userHasTeam ? (
  <section className="flex justify-center gap-5 w-[100%] px-1 py-1 my-16 border-black ">
    <div 
      className={` font-bold rounded-xl  text-[1.6em] cursor-pointer `}  
      onClick={() => {
        setJoinTeam(false);
        if (!teamCreated) {
          setTeamCreated(false);
        }
      }}
    >
      <p>Invite Team members</p>
    </div>
  </section>
) : (
  <section className="flex justify-center gap-5 w-[100%] sm:w-[50%] md:w-[70%] lg:w-[38%] px-1 py-1 my-16 border-2 border-black rounded-2xl">
    <div 
      className={`px-8 py-5 rounded-xl cursor-pointer ${!jointeam ? 'bg-[#1E1E1E] text-white' : 'bg-[#fff] text-black'}`}  
      onClick={() => {
        setJoinTeam(false);
        if (!teamCreated) {
          setTeamCreated(false);
        }
      }}
    >
      <p>{teamCreated ? 'Invite to Team' : 'Create Team'}</p>
    </div>
    <div 
      className={`px-8 py-5 rounded-xl cursor-pointer ${jointeam ? 'bg-[#1E1E1E] text-white' : 'bg-[#fff] text-black'}`}  
      onClick={() => setJoinTeam(true)}
    >
      <p>Join Team</p>
    </div>
  </section>
)}


        {showModal && (
          <div
            className={`fixed bottom-4 right-4 p-4 text-center text-white ${isSuccess ? 'bg-[#00ff00]' : 'bg-[#ff0000]'} border rounded-md`}
          >
            {message}
          </div>
        )}

        {!jointeam && (
          <section>
            {!teamCreated && (
              <section>
                <form onSubmit={handleSubmit}>
                  <div className='w-[100%] sm:w-[60%] md:w-[40%] mt-7'>
                    <label htmlFor="teamName">Team Name</label>
                    <input
                      type="text"
                      id="teamName"
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
                        className={`w-full mt-12 p-6 text-xl text-center shadow-[-5px_-5px_0px_0px_#0096FF] ${formData.name ? 'bg-[#1E1E1E] text-white' : 'bg-[#202020cb] text-[#a8a7a7]'} `}
                        disabled={!formData.name}
                      >
                        Create Team
                      </button>
                    </div>
                  </div>
                </form>
              </section>
            )}
            {teamCreated &&
              <section>
                <form onSubmit={handleInviteSubmit}>
                  <div className='w-[100%] sm:w-[70%] md:w-[60%] mt-7'>
                    <label htmlFor="teamName" className="text-[1.2em]">Search email</label>
                    <EmailInput emails={emails} setEmails={setEmails} limit={inviteLimit}/>
                    <p className="font-bold">Note: only registered participants can be invited</p>
                    <div className="w-[100%] sm:w-[60%] md:w-[40%]">
                      <button
                        type="submit"
                        className={`w-full mt-12 p-6 text-xl text-center shadow-[-5px_-5px_0px_0px_#0096FF] ${emails.length > 0 ? 'bg-[#1E1E1E] text-white' : 'bg-[#202020cb] text-[#a8a7a7]'} `}
                        disabled={emails.length === 0 || loading}
                      >
                        {loading ? "Loading..." : "Send Invite"}
                      </button>
                    </div>
                  </div>
                </form>
              </section>
            }
          </section>
        )}

        {jointeam && (
          <section>
            <div className='w-[100%] sm:w-[60%] md:w-[40%] mt-7'>
              <label htmlFor="joining_code">Joining Code</label>
              <input
                type="text"
                id="joining_code"
                name="joining_code"
                onChange={handleCodeChange}
                placeholder="Enter Joining Code"
                className="w-full p-4 border text-black border-black shadow-[4px_4px_0px_0px_#1E1E1E] mt-3"
                value={formCode.joining_code}
                required
              />
              <div className="w-[100%] sm:w-[60%] md:w-[40%]">
                <button
                  type="button"
                  onClick={handleJoinTeam}
                  className={`w-full mt-12 p-6 text-xl text-center shadow-[-5px_-5px_0px_0px_#0096FF] ${formCode.joining_code ? 'bg-[#1E1E1E] text-white' : 'bg-[#202020cb] text-[#a8a7a7]'} `}
                  disabled={!formCode.joining_code}
                >
                  Join Team
                </button>
              </div>
            </div>
          </section>
        )}
      {userHasTeam && data && (
    <section className="flex justify-center gap-5 w-[100%] px-1 py-1 my-16 border-black  ">
      {user?.id == data?.creator?.toString() ? (
        <button
          className="font-bold rounded-xl text-[1.6em] bg-[#4b0707] cursor-pointer bg-red-600 text-white px-8 py-5"
          onClick={handleDeleteTeam}
        >
          Delete Team
        </button>
      ) : (
        <button
          className="font-bold rounded-xl text-[1.6em] cursor-pointer bg-[#4b0707] text-white px-8 py-5"
          onClick={handleLeaveTeam}
        >
          Leave Team
        </button>
      )}
 </section>
  )}
      </section>
    </div>
  );
};

export default Team;
