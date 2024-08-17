import { useState, useEffect } from "react";
import React from "react";
import SideBar from "@/components/hackathon-sidebar";
import HackathonHeader from "@/components/hackathon-header";
import { BsPencil } from "react-icons/bs";
import Link from "next/link";

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
  web3_knowledge: string;
  hacking_role: string;
};

const initialFormState: UserData = {
  first_name: "",
  other_name: "",
  email: "",
  github_username: "",
  web3_knowledge: "",
  hacking_role: "",
};

export default function UpdateUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [change, setChange] = useState(false);
  const [formData, setFormData] = useState<UserData>(initialFormState);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      const fetchUser = async () => {
        try {
          const yourToken = localStorage.getItem("token");
      
          const response = await fetch(
            `https://web3lagosbackend.onrender.com/users/users/${parsedUser.id}/`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${yourToken}`,
              },
            }
          );
      
          if (response.ok) {
            const data = await response.json(); 
            console.log(data); 
            setUser(data)
          } else {
            console.log(`Error: ${response.status} - ${response.statusText}`);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      

    fetchUser()

     
      setFormData({
        first_name: user?.first_name || "",
        other_name: user?.other_name || "",
        email: user?.email || "",
        github_username: user?.github_username || "",
        web3_knowledge: user?.web3_knowledge || "",
        hacking_role: user?.hacking_role || "",
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setChange(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const yourToken = localStorage.getItem("token");
    setLoading(true);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    const response = await fetch(
      `https://web3lagosbackend.onrender.com/users/users/${user?.id}/`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${yourToken}`,
        },
        body: formDataToSend,
      }
    );

    if (response.ok) {
      const data = await response.json();
      setMessage("Profile successfully updated.");
      setIsSuccess(true);
      setChange(false);
      window.location.href="/hackathon/team"
      localStorage.setItem("user", JSON.stringify(data));
    } else {
      setMessage("Failed to Update");
      setIsSuccess(false);
    }

    setLoading(false);
  };

  return (
    <div className="flex w-full h-full px-4 sm:px-0">
      <div className="sm:w-1/5 fixed h-full sm:flex">
        <SideBar />
      </div>

      <section className="flex flex-col w-full mt-14 md:ml-64 px-4 sm:px-8">
        <div className="w-full bg-[#fff]">
          <HackathonHeader user={user} />
        </div>

        {message && (
          <div
            className={`fixed bottom-4 right-4 p-4 text-center text-white ${
              isSuccess ? "bg-[#28a745]" : "bg-[#dc3545]"
            } border rounded-md`}
          >
            {message}
          </div>
        )}

        <div className="text-2xl">Personal Profile</div>
        <form onSubmit={handleUpdate}>
          <div className="w-full mt-7">
            <label>First Name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              onChange={handleChange}
              className="w-full p-4 border border-[#1E1E1E] shadow-[4px_4px_0px_0px_#1E1E1E] mt-3"
              value={formData.first_name}
              required
            />
          </div>

          <div className="w-full mt-7">
            <label>Other names</label>
            <input
              type="text"
              id="other_name"
              name="other_name"
              onChange={handleChange}
              className="w-full p-4 border border-[#1E1E1E] shadow-[4px_4px_0px_0px_#1E1E1E] mt-3"
              value={formData.other_name}
              required
            />
          </div>

          <div className="w-full mt-7">
            <label>Email</label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={handleChange}
              className="w-full p-4 border border-[#1E1E1E] shadow-[4px_4px_0px_0px_#1E1E1E] mt-3"
              value={formData.email}
              required
            />
          </div>

          <div className="w-full mt-7">
            <label>Github Username</label>
            <input
              type="text"
              id="github_username"
              name="github_username"
              onChange={handleChange}
              className="w-full p-4 border border-[#1E1E1E] shadow-[4px_4px_0px_0px_#1E1E1E] mt-3"
              value={formData.github_username}
              required
            />
          </div>

          <div className="w-full mt-7">
            <label htmlFor="web3_knowledge">Web3 Knowledge</label>
            <select
              id="web3_knowledge"
              name="web3_knowledge"
              onChange={handleChange}
              value={formData.web3_knowledge}
              className="w-full p-4 border border-[#1E1E1E] shadow-[4px_4px_0px_0px_#1E1E1E] mt-3"
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

          <div className="w-full mt-7">
            <label htmlFor="hacking_role">Hacking Role</label>
            <select
              id="hacking_role"
              name="hacking_role"
              onChange={handleChange}
              value={formData.hacking_role}
              className="w-full p-4 border border-[#1E1E1E] shadow-[4px_4px_0px_0px_#1E1E1E] mt-3"
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

          <div className="flex gap-10 py-10">
            {!change && (
              <button
                className="p-5 bg-[#1E1E1E] text-center shadow-[-5px_-5px_0px_0px_#0096FF] text-white font-bold rounded-lg hover:bg-green-600 transition duration-300"
                onClick={() => setChange(true)}
              >
                <span className="flex gap-2">
                  Edit Info <BsPencil className="mt-1" />
                </span>
              </button>
            )}

            {change && (
              <button
                type="submit"
                className="p-5 bg-[#1E1E1E] text-center shadow-[-5px_-5px_0px_0px_#0096FF] text-white font-bold rounded-lg hover:bg-green-600 transition duration-300"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            )}

            <Link href="/hackathon/resetpassword">
              <button className="p-5 bg-[#1E1E1E] text-white rounded-lg">
                Change Password
              </button>
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}
