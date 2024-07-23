import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import EmailInput from "@/components/Email";
import SideBar from "@/components/hackathon-sidebar";
import HackathonHeader from "@/components/hackathon-header";

type TeamData = {
  name: string;
  creator: BigInteger;
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
  const [errors, setErrors] = useState<FormErrors>(initialFormErrors);
  const [data, setData] = useState<TeamData | null>(null);
  const [teamCreated, setTeamCreated] = useState(false);
  const [jointeam, setJoinTeam] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');

  const [user, setUser] = useState<User | null>(null);

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
              `https://web3lagosbackend.onrender.com/hackathon/teams/${user.id}/`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${yourToken}`,
                },
              }
            );
            const data = await response.json();
            setData(data);
            console.log('Response:', data);
            setTeamCreated(true);
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
      setFormData(initialFormState);
      setIsSuccess(true);
    } else {
      setErrors(data);
    }
    setLoading(false);
  };

  const handleInviteSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const yourToken = localStorage.getItem("token");
    const userString = localStorage.getItem("user");

    if (yourToken && userString) {
      const user = JSON.parse(userString);
      const response = await fetch(
        `https://web3lagosbackend.onrender.com/hackathon/teams/${user.id}/invite/`,
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
      } else {
        setMessage("Failed to send invite");
      }
    } else {
      setMessage("No token or user data found");
    }
  }

  const handleJoinTeam = async (e: FormEvent) => {
    const yourToken = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    e.preventDefault()

    if (yourToken && userString) {
      const user = JSON.parse(userString);
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
        setData(data);
      } else {
        setMessage("Failed to join the team");
      }
    } else {
      setMessage("No token or user data found");
    }
  };

  return (
    <div className='flex mt-[5rem] mb-5 px-4 sm:px-0'>
      <div className="sm:w-[27%] h-full sm:flex hidden">
        <SideBar />
      </div>

      <section className="flex flex-col sm:w-4/5 w-full sm:px-8">
        <div className="w-full">
          <HackathonHeader user={user} />
        </div>
        <section>
          <h1 className='text-3xl font-bold mt-5'>Team Overview</h1>
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

        <section className="flex justify-center gap-5 w-[100%] sm:w-[50%] md:w-[70%] lg:w-[38%] px-1 py-1 my-16 border-2 border-black rounded-2xl">
          <div className="px-8 py-5 bg-[#1E1E1E] text-white rounded-xl cursor-pointer"  onClick={() => setJoinTeam(false)}>
            <p>{teamCreated ? 'Invite to Team' : 'Create Team'} </p>
          </div>
          <div className="px-8 py-5 bg-[#1E1E1E] text-white rounded-xl cursor-pointer"  onClick={() => setJoinTeam(true)}>
            <p>Join Team</p>
          </div>
        </section>

        {message && (
          <div
            className={`mt-4 p-4 text-center text-black ${isSuccess ? 'bg-green-500' : 'bg-red-500'} border rounded-md`}
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
                    className="w-full mt-12 p-6 bg-[#1E1E1E] text-white text-xl text-center shadow-[-5px_-5px_0px_0px_#0096FF]"
                  >
                    Create Team
                  </button>
                </div>
              </div>
            </form>
          </section>
         )} : {
          <section>
            <form onSubmit={handleInviteSubmit}>
              <div className='w-[100%] sm:w-[70%] md:w-[60%] mt-7'>
                <label htmlFor="teamName">Search email</label>
                <EmailInput emails={emails} setEmails={setEmails} />
                <div className="w-[100%] sm:w-[60%] md:w-[40%]">
                  <button
                    type="submit"
                    className="w-full mt-12 p-6 bg-[#1E1E1E] text-white text-xl text-center shadow-[-5px_-5px_0px_0px_#0096FF]"
                    disabled={loading}
                 >
                     {loading ? "Loading..." : "Send Invite"}
                  </button>
                </div>
              </div>
            </form>
          </section>
        }
 </section>)}
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
                  className="w-full mt-12 p-6 bg-[#1E1E1E] text-white text-xl text-center shadow-[-5px_-5px_0px_0px_#0096FF]"
                >
                  Join Team
                </button>
              </div>
            </div>
          </section>
        )}
      </section>
    </div>
  );
};

export default Team;

