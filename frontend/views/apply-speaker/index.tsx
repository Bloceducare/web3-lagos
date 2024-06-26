/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import SuccessScreen from "./successScreen";
import React from "react";
import Category from "./category";

type FormData = {
  FirstName: string;
  OtherNames: string;
  email: string;
  phone: string;
  companyName: string;
  telegramID: string;
  country: string;
  city: string;
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
  country: "",
  city: "",
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
    <div className="max-w-7xl mx-auto px-4 p-3 mt-12 ">
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
      <div className="  w-full bg-white rounded lg:px-8 pt-6 pb-8 mb-4">
        <h1 className="text-4xl font-medium my-10">Speaker&apos;s Details</h1>
        <div className="text-center">
          {!!message && (
            <span
              className={`text-${
                message.includes("successful") ? "green" : "red"
              }-500`}
            >
              {message}
            </span>
          )}
        </div>
        <form onSubmit={handleSubmit} className="">
          <div className=" ">
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-x-6 sm:space-y-0">
              <div className="w-full sm:w-1/2">
                <label className="block mb-2 font-bold text-gray-600">
                  First Name <span className="text-red-600">* </span>
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="FirstName"
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="w-full p-3 border border-gray-300 rounded-xl shadow"
                  value={formData.FirstName}
                  required
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="OtherNames"
                  className="block mb-2 font-bold text-gray-600"
                >
                  Other Names <span className="text-red-600">* </span>
                </label>
                <input
                  type="text"
                  id="othernames"
                  name="OtherNames"
                  onChange={handleChange}
                  placeholder="Other names"
                  className="w-full p-3 border border-gray-300 rounded-xl shadow"
                  value={formData.OtherNames}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-x-6 sm:space-y-0">
              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="email"
                  className="block mb-2 font-bold text-gray-600 my-5"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="twitter"
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
                  htmlFor="phone"
                  className="block mb-2 font-bold text-gray-600 my-5"
                >
                  Phone number
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  onChange={handleChange}
                  placeholder="enter your phone number."
                  className="w-full p-3 border rounded-xl "
                  value={formData.phone}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-x-6 sm:space-y-0">
              <div className="w-full sm:w-1/2">
                <label className="block mb-2 font-bold text-gray-600 my-5">
                  Company's Name as Applicable. If not applicable place a N/A in
                  the box.
                </label>
                <input
                  type="text"
                  id="companyname"
                  name="companyName"
                  placeholder=" Enter your company name."
                  className="w-full p-3 border rounded-xl shadow"
                  onChange={handleChange}
                  value={formData.companyName}
                />
              </div>

              <div className="w-full sm:w-1/2">
                <label className="block mb-2 font-bold text-gray-600 my-5">
                  Link to Your website or Link to Your
                  (Portfolio/Resume/GitHub)"
                </label>
                <input
                  type="text"
                  id="telegramId"
                  name="telegramID"
                  className="w-full p-3 border rounded-xl shadow"
                  onChange={handleChange}
                  value={formData.telegramID}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-x-6 sm:space-y-0">
              <div className="w-full sm:w-1/2">
                <label className="block mb-2 font-bold text-gray-600 my-5">
                  Country <span className="text-red-600">*</span>{" "}
                </label>
                <input
                  type="text"
                  name="country"
                  placeholder="e.g Nigeria"
                  className="w-full p-3 border rounded-xl shadow"
                  onChange={handleChange}
                  value={formData.country}
                  required
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label className="block mb-2 font-bold text-gray-600 my-5">
                  City <span className="text-red-600">*</span>{" "}
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="e.g Abuja"
                  className="w-full p-3 border rounded-xl shadow"
                  onChange={handleChange}
                  value={formData.city}
                  required
                />
              </div>
            </div>

            <div className=" ">
              <label className="block mb-2 font-bold text-gray-600 my-5">
                XHandle
              </label>
              <input
                type="text"
                name="XHandle"
                placeholder="xhandle"
                className=" p-3 border rounded-xl shadow w-full"
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

            <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-x-6 sm:space-y-0">
              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="email"
                  className="block mb-2 font-bold text-gray-600"
                >
                  Title of your Lecture
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  onChange={handleChange}
                  placeholder="What is the title of your Lecture?"
                  className="w-full p-3 border rounded-xl shadow"
                  value={formData.presentationTitle}
                  required
                />
              </div>
              <div className="w-full sm:w-1/2">
                <Category />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 sm:w-full">
              <label className="my-6">
                Write a compelling session abstract (150-250 words) that
                showcases your content.
              </label>
            </div>
            <textarea
              name=""
              id=""
              rows={6}
              className="w-full p-2 rounded-xl border"
            ></textarea>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
              <label className="my-5">
                Outline Your Key Elements. List 4 to 5 primary or key elements
                of your topic that you will be discussing.
              </label>
            </div>
            <textarea
              name=""
              id=""
              rows={6}
              className="w-full p-2 rounded-xl border"
            ></textarea>

            <div className="w-full lg:w-1/2 my-5 ">
              <label>Target Audience</label>
              <select
                className="w-full p-3 bg-white rounded-xl  border-[0.7px] my-1"
                name="role"
                onChange={handleChange}
                value={formData.role}
                required
              >
                <option value="" disabled>
                  types of audience
                </option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              {errors.role && (
                <span className="text-red-500">{errors.role.join(", ")}</span>
              )}
            </div>
            <div className="my-5 ">
              <label>
                Have you given this presentation before and/or you do you intend
                to present it elsewhere in the near future?
              </label>

              <select className="block w-full lg:w-1/2 p-3 mt-1 border form-select rounded-xl">
                <option value="" disabled>
                  Please Select an Option
                </option>
                <option value="yes">yes</option>
                <option value="no">no</option>
              </select>
            </div>

            <div>
              <label>
                If YES, please list where and when - If NO place N/A in the box.
                <br></br>
              </label>
              <textarea
                name=""
                id=""
                rows={6}
                className="w-full lg:w-1/2 border rounded-xl"
              ></textarea>
            </div>
            <div className="my-5">
              <label>
                Please provide references with phone number or email - If NO
                place N/A in the box.<br></br>
              </label>
              <textarea
                name=""
                id=""
                rows={6}
                className="w-full lg:w-1/2 border rounded-xl"
              ></textarea>
            </div>

            <div className="flex items-center sm:flex-rowspace-y-3 space-x-4">
              <div className="flex">
                <input
                  id="agree-yes"
                  type="checkbox"
                  className="apperance-none checked:bg-blue-500"
                  name="agree"
                  value={1}
                  onChange={handleChange}
                />
              </div>
              <label className="block  font-bold text-gray-600">
                I agree to submit my presentation prior to the Conference.
              </label>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-x-6 sm:space-y-0">
              <div className="w-full lg:w-1/2 ">
                <label className="block mb-2 font-bold text-gray-600 my-5">
                  What Best Describes Your Role In Web3
                </label>
                <select
                  className="w-full p-3 bg-white rounded-lx border-[0.7px]"
                  name="role"
                  onChange={handleChange}
                  value={formData.role}
                  required
                >
                  <option value="" disabled>
                    Please Select an Option
                  </option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                {errors.role && (
                  <span className="text-red-500">{errors.role.join(", ")}</span>
                )}
              </div>
              <div className="w-full sm:w-1/2">
                <label className="block mb-2 font-bold text-gray-600 my-5">
                  Telgram Username
                </label>
                <input
                  type="text"
                  id="telegramId"
                  name="telegramID"
                  placeholder="Put in your  telegram username"
                  className="w-full p-3 border rounded-xl shadow"
                  onChange={handleChange}
                  value={formData.telegramID}
                />
              </div>
            </div>
            <div className="flex items-center sm:flex-rowspace-y-3 space-x-4">
              <div className="flex my-5">
                <input
                  id="verified-yes"
                  type="checkbox"
                  className="apperance-none checked:bg-blue-500 my-5"
                  name="agree"
                  value={1}
                  onChange={handleChange}
                />
              </div>
              <label className="block  font-bold text-gray-600 my-5">
                I have verified that all information provided is accurate and
                complete.
              </label>
            </div>
            <div className="w-full justify-between flex">
              <button
                type="button"
                className="flex rounded-md items-center justify-center text-center space-x-2"
                onClick={handleDelete}
              >
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
                className="rounded-lg from-[#3E3797] to-[#111022] bg-gradient-to-r text-white px-3 py-1.5 text-center"
                disabled={loading}
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
