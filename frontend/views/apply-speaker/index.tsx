import { useState } from "react";
// import axios from "axios";

type FormData = {
  userName: string;
  email: string;
  telegramID: string;
  twitterHandle: string;
  companyName: string;
  role: string;
  presentationTitle: string;
  pitchStory: string;
  spokenAtWeb3Before: boolean;
  gender: string;
  type: string;
};
const initialFormState = {
  userName: "",
  email: "",
  telegramID: "",
  twitterHandle: "",
  companyName: "",
  presentationTitle: "",
  role: "",
  pitchStory: "",
  spokenAtWeb3Before: false,
  gender: "",
  type: "speaker",
};

const roles = [
  'Developer',
  'Investor',
  'Community Manager',
  'Trader',
  'Researcher',
  'Other',
];

const ApplyAsaSpeaker = () => {
   
    const [formData, setFormData] = useState<FormData>(initialFormState);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form Data Submitted:', formData);
    };
  
    const handleDelete = () => {
      setFormData(initialFormState);
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-2xl bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

          <h1 className="text-2xl font-bold mb-4"> Speaker's Detail Form </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                userName:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.userName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                telegramID:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="telegram"
                placeholder="Enter your telegramID"
                value={formData.telegramID}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                twitterHandle:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="twitter"
                placeholder="Enter your twitterHandle"
                value={formData.twitterHandle}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                CompanyName:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="companyname"
                placeholder="Enter your companyName"
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>
           
            <div className="mb-4">
              <label className="block text-gray-500 text-sm font-bold mb-2">
                What Best Describes Your Role in Web3:
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="">Select a role</option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between">
             
              <button
                className="bg-black-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleDelete}
              >
                Clear Form
              </button>
              <button
                className="bg-blue-700 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
          
        </div>
      </div>
    );
  }
  
export default ApplyAsaSpeaker;

