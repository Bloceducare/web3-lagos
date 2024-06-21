import { useState } from 'react';
import Link from "next/link";
import Button from '@/components/button';

type FormData = {
  name: string;
  email: string;
  phone: string;
  location: string;
  telegramUsername: string;
  xHandle: string;
  role: string;
};

const initialFormState: FormData = {
  name: '',
  email: '',
  phone: '',
  location: '',
  telegramUsername: '',
  xHandle: '',
  role: '',
};

const roles = [
  'Developer',
  'Investor',
  'Community Manager',
  'Trader',
  'Researcher',
  'Other',
];

export default function personalDetailForm() {
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

      <div>
  <h1>
    Web3 Lagos Conference 2.0: Registration Form
  </h1>
  <h2>
  Register Now!
    </h2>
    <h5> Be a part of the event</h5>
    <h3> Fill in the information carefully</h3>
    <h3>Is this your first submission or is it a revision?</h3>
    <p>Please select whether this is your first submission (first time registering for the event) or if </p>
    <p> you already have submitted a form but wish to change something from the original submission.</p>

   <form>
    <input type="radio" id='yes' name='yes' value={'yes'}/>
    <label>yes</label>
    <input type="radio" id='no' name='no' value={'no'}/>
    <label>no</label>
   </form>



    <Link href="/apply/speaker">
          <Button className="border  bg-blue text-black-200 py-2 px-6 text-[15px] leading-[24px] rounded-[1px]">
            Register as a Speaker
          </Button>
        </Link>

        </div>
        <h1 className="text-2xl font-bold mb-4">Personal Detail Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
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
              Phone Number:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Location:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="location"
              placeholder="Enter your location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Telegram Username:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="telegramUsername"
              placeholder="Enter your Telegram username"
              value={formData.telegramUsername}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              X Handle:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="xHandle"
              placeholder="Enter your X handle"
              value={formData.xHandle}
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
