import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import SuccessScreen from "./successScreen";
import React from "react";

type FormData = {
  FirstName: string;
  OtherNames: string;
  email: string;
  phone: string;
  companyName: string;
  telegramID: string;
  location: string;
  XHandle: string;
  role: string;
  presentationTitle: string;
  pitchStory: string;
  spokenAtWeb3Before: boolean;
  gender: string;
  type: string;
};

type FormErrors = {
  [key in keyof FormData]?: string[];
};
const initialFormState: FormData = {
  FirstName: "",
  OtherNames: "",
  email: "",
  location: "",
  telegramID: "",
  XHandle: "",
  companyName: "",
  presentationTitle: "",
  phone: "",
  role: "",
  pitchStory: "",
  spokenAtWeb3Before: false,
  gender: "",
  type: "speaker",
};

const initialFormErrors: FormErrors = {};

const roles = [
  "Developer",
  "Investor",
  "Community Manager/Community Builder",
  "Trader",
  "Newbies",
  "Designer",
  "Marketer",
  "Product Manager",
  "Content",
  "Researcher",
  "Other",
];

export default function ApplyAsaSpeaker() {
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>(initialFormErrors);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrors(initialFormErrors);

    const response = await fetch(
      "https://web3lagosbackend.onrender.com/api/speaker-registrations/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setMessage("Registration successful!");
      setFormData(initialFormState);
      setIsSuccess(true); // Show success screen
    } else {
      setErrors(data);
      setMessage("Registration failed. Please try again.");
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
  const gradientStyle = {
    background:
      "linear-gradient(90deg, #C96C4E 9.5%, #AC615D 27%, #895470 37%, #3E3797 70%, #BD6854 84%, #3E3797 100%, #C96C4E)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    color: "transparent",
  };

  return (
     <div className="p-3 mt-12">

      <div className="w-full text-center">
        <h1 style={gradientStyle} className="text-[50px] font-black">
          Web3 Lagos Conference 3.0: Registration Form
        </h1>
        <div className="h-[150px] flex flex-col justify-between mt-5 pb-8 border-b-[1px] ">
          <h4 style={gradientStyle} className="text-[36px] font-black">
            Register Now!
          </h4>
          <p className="text-[#181818] ">Be a part of the event</p>
          <p className="text-[#343D42] font-medium text-[20px] ">
            Fill in the informations carefully
          </p>
        </div>
      </div>
      <div className="  w-[88vw] bg-white rounded lg:px-8 pt-6 pb-8 mb-4">
        <h1 className="text-4xl font-medium my-10">Speaker&apos;s Details</h1>

        {/* {!!dataStatus.error && (
          <span className="text-red-500 ">{dataStatus.error}</span>
        )} */}
        {!!!message && (
          <form onSubmit={handleSubmit}>
            <div className="sm:flex-wrap mb-4 w-full lg:flex lg:gap-[20px] lg:flex-nowrap justify-between align-bottom h-auto">
              <label
                htmlFor="FirstName"
                className="block mb-2 font-bold text-gray-600"
              >
                Speakers Name <span className="text-red-600">* </span>
              </label><br></br>
              <input
                type="text"
                id="firstname"
                name="FirstName"
                onChange={handleChange}
                placeholder="put in your first name"
                className="w-full p-3 border border-gray-300 rounded shadow mb-"
                value={formData.FirstName}
                required
              />
              <label
                htmlFor="OtherNames"
                className="block mb-2 font-bold text-gray-600"
              >
                OtherNames <span className="text-red-600">* </span>
              </label>
              <input
                type="text"
                id="othernames"
                name="OtherNames"
                onChange={handleChange}
                placeholder="put in your other names"
                className="w-full p-3 border border-gray-300 rounded shadow mb-"
                value={formData.OtherNames}
                required
              />
            </div>
            <div className="sm:flex-wrap mb-4 w-full lg:flex lg:gap-[20px] lg:flex-nowrap justify-between align-bottom h-auto">
              <label
                htmlFor="email"
                className="block mb-2 font-bold text-gray-600"
              >
                Email Address <span className="text-red-600">*</span>{" "}
              </label>
              <input
                type="email"
                id="twitter"
                name="email"
                onChange={handleChange}
                placeholder="Put in your email."
                className="w-full p-3 border rounded shadow"
                value={formData.email}
                required
              />

              <label
                htmlFor="phone"
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
                value={formData.phone}
                required
              />
            </div>
            <div className="sm:flex-wrap mb-4 w-full lg:flex lg:gap-[20px] lg:flex-nowrap justify-between align-bottom h-auto">
              <label className="block mb-2 font-bold text-gray-600">
                Company's Name as Applicable. If not applicable place a N/A in
                the box.
              </label>
              <input
                type="text"
                id="companyname"
                name="companyName"
                placeholder="Put in your company name."
                className="w-full p-3 border rounded shadow"
                onChange={handleChange}
                value={formData.companyName}
              />

              <label className="block mb-2 font-bold text-gray-600">
                Link to Your website or Link to Your (Portfolio/Resume/GitHub)"
              </label>
              <input
                type="text"
                id="telegramId"
                name="telegramID"
                className="w-full p-3 border rounded shadow"
                onChange={handleChange}
                value={formData.telegramID}
              />
            </div>
            <div className="sm:flex-wrap mb-4 w-full lg:flex lg:gap-[20px] lg:flex-nowrap justify-between align-bottom h-auto">
              <label className="block mb-2 font-bold text-gray-600">
                Location <span className="text-red-600">*</span>{" "}
              </label>
              <input
                type="text"
                name="location"
                placeholder="Lagos,Nigeria"
                className="w-full p-3 border rounded shadow"
                onChange={handleChange}
                value={formData.location}
                required
              />

              <label className="block mb-2 font-bold text-gray-600">
                XHandle <span className="text-red-600">*</span>{" "}
              </label>
              <input
                type="text"
                name="XHandle"
                placeholder="xhandle"
                className="w-full p-3 border rounded shadow"
                onChange={handleChange}
                value={formData.XHandle}
                required
              />
            </div>
            <div className="my-10">
              <p className="text-[20px]">
                Craft a concise, informative, and attention-grabbing title for
                your lecture.
              </p>
</div>
              <div className="sm:flex-wrap mb-4 w-full lg:flex lg:gap-[20px] lg:flex-nowrap justify-between align-bottom h-auto">
                <label
                  htmlFor="email"
                  className="block mb-2 font-bold text-gray-600"
                >
                  Title of your Lecture <span className="text-red-600">*</span>{" "}
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  onChange={handleChange}
                  placeholder="What is the title of your Lecture?"
                  className="w-full p-3 border rounded shadow"
                  value={formData.presentationTitle}
                  required
                />

                <label
                  htmlFor="category"
                  className="block mb-2 font-bold text-gray-600"
                >
                  category <span className="text-red-600">*</span>{" "}
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
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
              <label>
                Write a compelling session abstract (150-250 words) that
                showcases your content.
              </label>
              <textarea
                name=""
                id=""
                rows={10}
                className="appearance-none border rounded-[10px] py-3 px-3 mt-[12px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-[14px] lg:w-full"
              ></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
              <label>
                Outline Your Key Elements. List 4 to 5 primary or key elements
                of your topic that you will be discussing.
              </label>
              <textarea
                name=""
                id=""
                rows={10}
                className="appearance-none border rounded-[10px] py-3 px-3 mt-[12px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-[14px] lg:w-full"
              ></textarea>
            </div>
            <div>
              <label>Target Audience</label>
              <textarea
                name=""
                id=""
                rows={10}
                className="appearance-none border rounded-[10px] py-3 px-3 mt-[12px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-[14px] lg:w-full"
              ></textarea>
            </div>
            <div>
              <label>
                Have you given this presentation before and/or you do you intend
                to present it elsewhere in the near future?
              </label>
              <textarea
                name=""
                id=""
                rows={10}
                className="appearance-none border rounded-[10px] py-3 px-3 mt-[12px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-[14px] lg:w-full"
              ></textarea>
            </div>
            <div>
              <label>
                If YES, please list where and when - If NO place N/A in the box.
              </label>
              <textarea
                name=""
                id=""
                rows={10}
                className="appearance-none border rounded-[10px] py-3 px-3 mt-[12px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-[14px] lg:w-full"
              ></textarea>
            </div>
            <div>
              <label>
                Please provide references with phone number or email - If NO
                place N/A in the box.
              </label>
              <textarea
                name=""
                id=""
                rows={10}
                className="appearance-none border rounded-[10px] py-3 px-3 mt-[12px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-[14px] lg:w-full"
              ></textarea>
            </div>
            <div className="mb-5">
              <label className="block mb-2 font-bold text-gray-600">
                I agree to submit my presentation prior to the Conference.
              </label>
              <select
                className="block w-full p-3 mt-1 border form-select"
                name="role"
                onChange={handleChange}
              >
                <option selected disabled>
                  Please Select date
                </option>
                <option value="beginner">I am new to Blockchain/Web3</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="content">Content Creator</option>
                <option value="community">Community Manager</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div className="sm:flex-wrap mb-4 w-full lg:flex lg:gap-[20px] lg:flex-nowrap justify-between align-bottom h-auto">
            I have verfied that all information provided is accurate and
            complete.
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
            <label className="block mb-2 font-bold text-gray-600">
              Telgram Username
            </label>
            <input
              type="text"
              id="telegramId"
              name="telegramID"
              placeholder="Put in your  telegram username"
              className="w-full p-3 border rounded shadow"
              onChange={handleChange}
              value={formData.telegramID}
            />
           
            {/* <button
                disabled={crud}
                className="block w-full p-4 font-bold text-white bg-blue-500 rounded-lg"
              >
                {crud ? "Sending..." : "Submit"}
              </button> */}
          </form>
        )}
      </div>
     </div>
  );
}
