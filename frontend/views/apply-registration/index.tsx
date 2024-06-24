import { useState } from 'react';
import Link from "next/link";
import Image from 'next/image';
import axios from 'axios';
import SuccessScreen from '../successScreen'
import React from 'react';

type FormData = {
  name: string;
  email: string;
  phone: string;
  country: string;
  location: string;
  telegramusername: string;
  xhandle: string;
  role: string;
  gender: string;
};

type FormErrors = {
  [key in keyof FormData]?: string[];
};

const initialFormState: FormData = {
  name: '',
  email: '',
  phone: '',
  country: '',
  location: '',
  telegramusername: '',
  xhandle: '',
  role: '',
  gender: '',
};

const initialFormErrors: FormErrors = {};

const roles = [
  'Developer',
  'Investor',
  'Community Manager/Community Builder',
  'Trader',
  'Newbies',
  'Designer',
  'Marketer',
  'Product Manager',
  'Content',
  'Researcher',
  'Other',
];

export default function personalDetailForm() {
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>(initialFormErrors);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setErrors(initialFormErrors);

    const response = await fetch('https://web3lagosbackend.onrender.com/api/general-registrations/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    
    if (response.ok) {
      setMessage('Registration successful!');
      setFormData(initialFormState);
      setIsSuccess(true); // Show success screen
    } else {
      setErrors(data);
      setMessage('Registration failed. Please try again.');
    }

    setLoading(false);
  };
  const handleDelete = () => {
    setFormData(initialFormState);
  };

  if (isSuccess) {
    return (
      <div className="">
        <SuccessScreen />
      </div>
    );
  }
  
  return (
     <div className="p-3 mt-12">
         <h1 className="mb-2 text-3xl text-center font-semibold text-gray-800">
           Web3 Lagos 2023 Registration
         </h1>
       <div className="p-10 mx-auto bg-white rounded-lg shadow md:w-3/4 lg:w-1/2 ">
         <h3 className="text-center">Registration has closed!! See you at the event 😊</h3>
       </div>
        
       {/* <div className="text-center">
        <h1 className="mb-2 text-3xl font-semibold text-gray-800">
        Web3 Lagos 2023 Registration
        </h1>
        {!!dataStatus.error && (
          <span className="text-red-500 ">{dataStatus.error}</span>
        )}
      </div>
      <div className="p-10 mx-auto bg-white rounded-lg shadow md:w-3/4 lg:w-1/2">
        {!!!message && (
          <>
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label
                  htmlFor="userName"
                  className="block mb-2 font-bold text-gray-600"
                >
                  Name <span className="text-red-600">* </span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="userName"
                  onChange={handleChange}
                  placeholder="put in your full name"
                  className="w-full p-3 border border-gray-300 rounded shadow mb-"
                  value={userName}
                  required
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="twitter"
                  className="block mb-2 font-bold text-gray-600"
                >
                  Email <span className="text-red-600">*</span>{" "}
                </label>
                <input
                  type="email"
                  id="twitter"
                  name="email"
                  onChange={handleChange}
                  placeholder="Put in your email."
                  className="w-full p-3 border rounded shadow"
                  value={email}
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="twitter"
                  className="block mb-2 font-bold text-gray-600"
                >
                  Phone number <span className="text-red-600">*</span>{" "}
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  onChange={handleChange}
                  placeholder="Put in your phone number."
                  className="w-full p-3 border rounded shadow"
                  value={phone}
                  required
                />
              </div>

              <div className="mb-5">
                <label className="block mb-2 font-bold text-gray-600">
                  Location <span className="text-red-600">*</span>{" "}
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="Lagos,Nigeria"
                  className="w-full p-3 border rounded shadow"
                  onChange={handleChange}
                  value={location}
                  required
                />
              </div>

              <div className="mb-5 ">
                <span className="block mb-2 font-bold text-gray-600">
                  Are you attending workshop days (Thursday and Friday)?
                </span>
                <div className="flex items-center p-3 mt-2">
                  <div className="">
                    <input
                      id="attendingOtherDays-yes"
                      type="radio"
                      className="form-radio"
                      name="attendingOtherDays"
                      value={1}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="attendingOtherDays-yes"
                      className="inline-flex items-center"
                    >
                      <span className="">Yes</span>
                    </label>
                  </div>

                  <div>
                    <input
                      id="attendingOtherDays-no"
                      type="radio"
                      className="form-radio"
                      name="attendingOtherDays"
                      value={0}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="attendingOtherDays-no"
                      className="inline-flex items-center ml-6"
                    >
                      <span className="">No</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <label className="block mb-2 font-bold text-gray-600">
                  Company Name{" "}
                </label>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Put in your company name."
                  className="w-full p-3 border rounded shadow"
                  onChange={handleChange}
                  value={companyName}
                />
              </div>

              <div className="mb-5">
                <label className="block mb-2 font-bold text-gray-600">
                  What best describes your role in web3{" "}
                </label>
                <select
                  className="block w-full p-3 mt-1 border form-select"
                  name="role"
                  onChange={handleChange}
                >
                  <option selected disabled>
                    Please Select an Option
                  </option>
                  <option value="beginner">I am new to Blockchain/Web3</option>
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                  <option value="content">Content Creator</option>
                  <option value="community">Community Manager</option>
                  <option value="others">Others</option>
                </select>
              </div>

              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                  <div className="mb-5 ">
                    <label className="block mb-2 font-bold text-gray-600">
                      <span> Telegram Username </span>
                      <br />
                      <span className="text-xs hover:text-sky-500">
                        <a href="https://t.me/Web3bridge" target="_blank">
                          Do join our telegram channel
                        </a>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="telegramID"
                      placeholder="Put in your telegram ID"
                      className="w-full p-3 border rounded shadow"
                      onChange={handleChange}
                      value={telegramID}
                    />
                  </div>

                  <div className="mb-5">
                    <label className="block mb-2 font-bold text-gray-600">
                      <span> Twitter Handle </span>
                      <br />
                      <span className="text-xs hover:text-sky-500">
                        <a
                          href="https://twitter.com/Web3Bridge"
                          target="_blank"
                        >
                          Follow us on twitter
                        </a>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="twitterHandle"
                      placeholder="Put in your twitter handle"
                      className="w-full p-3 border rounded shadow"
                      onChange={handleChange}
                      value={twitterHandle}
                    />
                  </div>
                </div>
              </div>

              <button
                disabled={crud}
                className="block w-full p-4 font-bold text-white bg-blue-500 rounded-lg"
              >
                {crud ? "Sending..." : "Submit"}
              </button>
            </form>
          </>
        )}

        {!!message && message}
        {!!message && (
          <div>
            <h4 className="mt-2">Make a tweet</h4>
            <TwitterShareButton
              className="items-center"
              url="https://event.web3bridge.com/"
              title="I just registered for web3Lagos Conference 2023 !!"
              hashtags={[
                "Web3",
                "Blockchain",
                "Web3Bridge",
                "Web3LagosConference",
              ]}
              related={["@Web3Bridge"]}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </div>
        </form>
      </div>
    </div>  */}
    </div>
  );
}