/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import SuccessScreen from "./successScreen";
import React from "react";
import Category from "./category";

type FormData = {
  firstname: string;
  other_name: string;
  email: string;
  phone_number: string;
  company_name: string;
  website_or_portfolio: string;
  x_handle: string;
  lecture_title: string;
  category: string;
  session_abstract: string;
  web3_role: string;
  available_at_any_day: boolean | string;
  location: string;
  telegram_id: string;
  pitch_story: string;
  spoken_at_web3_before: boolean | string;
  gender: string;
  session_type: string;
  profilepicurl: string;
};

type FormErrors = {
  [key in keyof FormData]?: string[];
};

const initialFormState: FormData = {
  firstname: "",
  other_name: "",
  email: "",
  phone_number: "",
  company_name: "",
  website_or_portfolio: "",
  x_handle: "",
  lecture_title: "",
  category: "",
  session_abstract: "",
  web3_role: "",
  available_at_any_day: true,
  location: "",
  telegram_id: "",
  pitch_story: "",
  spoken_at_web3_before: true,
  gender: "",
  session_type: "",
  profilepicurl: "",
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
const sessiontype = [
  "Talk (25 + 5 QA)(30 minutes)",
  "Workshop 1hr",
  "Workshop 1hr (30 minutes)",
  "Workshop 2hrs",
  "Lightning Talk (10 minutes",
  "Panel",
];

export default function ApplyAsaSpeaker() {
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>(initialFormErrors);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
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
    const updatedFormData = {
      ...formData,
      available_at_any_day:
        formData.available_at_any_day === "false" ? false : true,
      spoken_at_web3_before:
        formData.spoken_at_web3_before === "false" ? false : true,
    };
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
        body: JSON.stringify(updatedFormData),
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
      <div className="w-full m-auto flex">
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
    <div className="max-w-7xl mx-auto px-4 p-3 pt-[8rem]">
      <div className="w-full flex-col flex items-center justify-center text-center">
        <h1 className="mb-2 w-full bg-gradient-to-r text-[2em] text-transparent bg-clip-text text-center font-semibold from-[#895470] via-[#BD6854] to-[#3E3797]">
          Web3 Lagos Conference 3.0: Speaker Form
        </h1>
        <p className="bg-gradient-to-r text-transparent bg-clip-text text-[1.5em] text-center font-semibold from-[#3E3797] via-[#895470] to-[#3E3797]">
          Register Now!
        </p>

        <p className="text-[0.8em]">Be a part of the Event</p>

        <p className="text-[1.3em] font-[500] mt-4 pb-10">
          Fill in the information carefully
        </p>
      </div>

      <div className="w-full bg-white rounded lg:px-8 pt-6 pb-8 mb-4">
        <h1 className="font-bold text-[1.5em] mb-8">Speaker's Details</h1>

        <div className="text-center">
          {!!message && (
            <span
              className={`text-${
                message.includes("successful") ? "green" : "red"
              }-500`}>
              {message}
            </span>
          )}
        </div>
        <form onSubmit={handleSubmit} className="">
          <div className="">
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-x-6 sm:space-y-0">
              <div className="w-full sm:w-1/2">
                <label className="block mb-2 font-bold text-gray-600">
                  First Name <span className="text-red-600">* </span>
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="w-full p-3 border border-gray-300 rounded-xl shadow"
                  value={formData.firstname}
                  required
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="other_name"
                  className="block mb-2 font-bold text-gray-600">
                  Other Names <span className="text-red-600">* </span>
                </label>
                <input
                  type="text"
                  id="other_name"
                  name="other_name"
                  onChange={handleChange}
                  placeholder="Other names"
                  className="w-full p-3 border border-gray-300 rounded-xl shadow"
                  value={formData.other_name}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-x-6 sm:space-y-0">
              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="email"
                  className="block mb-2 font-bold text-gray-600 my-5">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter your email."
                  className="w-full p-3 border rounded-xl shadow"
                  value={formData.email}
                  required
                />
              </div>
              <div className="w-full sm:w-1/2 ">
                <label
                  htmlFor="phone_number"
                  className="block mb-2 font-bold text-gray-600 my-5">
                  Phone number
                </label>
                <input
                  type="text"
                  id="phone_number"
                  name="phone_number"
                  onChange={handleChange}
                  placeholder="Enter your phone number."
                  className="w-full p-3 border rounded-xl "
                  value={formData.phone_number}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-x-6 sm:space-y-0">
              <div className="w-full sm:w-1/2">
                <label className="block mb-2 font-bold text-gray-600 my-5">
                  Company's Name as Applicable. If not applicable, place N/A in
                  the box.
                </label>
                <input
                  type="text"
                  id="company_name"
                  name="company_name"
                  placeholder="Enter your company name."
                  className="w-full p-3 border rounded-xl shadow"
                  onChange={handleChange}
                  value={formData.company_name}
                />
              </div>

              <div className="w-full sm:w-1/2">
                <label className="block mb-2 font-bold text-gray-600 my-5">
                  Link to Your Website or Link to Your (Portfolio/Resume/GitHub)
                </label>
                <input
                  type="text"
                  id="website_or_portfolio"
                  name="website_or_portfolio"
                  className="w-full p-3 border rounded-xl shadow"
                  onChange={handleChange}
                  value={formData.website_or_portfolio}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-x-6 sm:space-y-0">
              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="x_handle"
                  className="block mb-2 font-bold text-gray-600 my-5">
                  Your X Handle{" "}
                </label>
                <input
                  type="text"
                  id="x_handle"
                  name="x_handle"
                  onChange={handleChange}
                  placeholder="Your X handle"
                  className="w-full p-3 border rounded-xl shadow"
                  value={formData.x_handle}
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label className="block mb-2 font-bold text-gray-600 my-5">
                  Lecture Title <span className="text-red-600">* </span>
                </label>
                <input
                  type="text"
                  id="lecture_title"
                  name="lecture_title"
                  onChange={handleChange}
                  placeholder="The title of your lecture."
                  className="w-full p-3 border rounded-xl shadow"
                  value={formData.lecture_title}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 mt-6 sm:space-x-6 sm:space-y-0">
              <div className="w-full">
                <Category
                  id="category"
                  name="category"
                  onChange={handleChange}
                  value={formData.category}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="web3_role"
                  className="block mb-2 font-bold text-gray-600">
                  Session Type
                  <span className="text-red-600">* </span>
                </label>
                <select
                  id="session_type"
                  name="session_type"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-xl shadow"
                  value={formData.session_type}
                  required>
                  <option value="">Select your session type</option>
                  {sessiontype.map((session) => (
                    <option key={session} value={session}>
                      {session}
                    </option>
                  ))}
                </select>
              </div>

            </div>
              <div className="w-full">
                <label
                  htmlFor="session_abstract"
                  className="block mb-2 font-bold text-gray-600 my-5">
                  Write a compelling session abstract that showcases your
                  content (if applicable else N/A).
                </label>
                <textarea
                  id="session_abstract"
                  name="session_abstract"
                  onChange={handleChange}
                  placeholder="Brief description of your session."
                  className="w-full p-3 border rounded-xl shadow"
                  value={formData.session_abstract}
                  rows={8}
                />
              </div>
            
      
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-x-6 sm:space-y-0">
              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="web3_role"
                  className="block mb-2 font-bold text-gray-600 my-5">
                  What Best Describes Your Role In Web3{" "}
                  <span className="text-red-600">* </span>
                </label>
                <select
                  id="web3_role"
                  name="web3_role"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-xl shadow"
                  value={formData.web3_role}
                  required>
                  <option value="">Select your role</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="available_at_any_day"
                  className="block mb-2 font-bold text-gray-600 my-5">
                  Are You Available To Speak On Any Of The Three Days <span className="text-red-600">* </span>
                </label>
                <select
                  id="available_at_any_day"
                  name="available_at_any_day"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-xl shadow"
                  value={String(formData.available_at_any_day)}
                  required>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-x-6 sm:space-y-0">
              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="location"
                  className="block mb-2 font-bold text-gray-600 my-5">
                  Location <span className="text-red-600">* </span>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  onChange={handleChange}
                  placeholder="Enter your location"
                  className="w-full p-3 border rounded-xl shadow"
                  value={formData.location}
                />
              </div>

              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="telegram_id"
                  className="block mb-2 font-bold text-gray-600 my-5">
                  Your Telegram ID <span className="text-red-600">* </span>
                </label>
                <input
                  type="text"
                  id="telegram_id"
                  name="telegram_id"
                  onChange={handleChange}
                  placeholder="Enter your telegram id."
                  className="w-full p-3 border rounded-xl shadow"
                  value={formData.telegram_id}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-x-6 sm:space-y-0">
              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="pitch_story"
                  className="block mb-2 font-bold text-gray-600 my-5">
                  Pitch Story
                </label>
                <textarea
                  id="pitch_story"
                  name="pitch_story"
                  onChange={handleChange}
                  placeholder="Share your story with us."
                  className="w-full p-3 border rounded-xl shadow"
                  value={formData.pitch_story}
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="spoken_at_web3_before"
                  className="block mb-2 font-bold text-gray-600 my-5">
                  Spoken at Web3 Before <span className="text-red-600">* </span>
                </label>
                <select
                  id="spoken_at_web3_before"
                  name="spoken_at_web3_before"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-xl shadow"
                  value={String(formData.spoken_at_web3_before)}
                  required>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-x-6 sm:space-y-0">
              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="gender"
                  className="block mb-2 font-bold text-gray-600 my-5">
                  Gender <span className="text-red-600">* </span>
                </label>
                <select
                  id="gender"
                  name="gender"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-xl shadow"
                  value={formData.gender}
                  required>
                  <option value="">Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="female">Others</option>
                </select>
              </div>
              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="profilepicurl"
                  className="block mb-2 font-bold text-gray-600 my-5">
                  Profile Pic Url <span className="text-red-600">* </span>
                </label>
                <input
                  type="text"
                  id="profilepicurl"
                  name="profilepicurl"
                  onChange={handleChange}
                  placeholder="Enter the url of your profile picture."
                  className="w-full p-3 border rounded-xl shadow"
                  value={formData.profilepicurl}
                />
              </div>
            </div>
            <div className="flex items-center justify-between mt-12">
              <button
                type="button"
                className="flex rounded-md items-center justify-center text-center space-x-2"
                onClick={handleDelete}>
                <Image
                  src={"/clearform.svg"}
                  alt="..."
                  height={10}
                  width={15}
                />
                <p className="text-center">Clear Form</p>
              </button>

              <button
                type="submit"
                className={`rounded-lg from-[#3E3797] to-[#111022] bg-gradient-to-r text-white px-3 py-1.5 text-center ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
