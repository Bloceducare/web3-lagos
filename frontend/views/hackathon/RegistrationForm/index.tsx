/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import React from "react";
import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";
import HackathonSuccessScreen from "./SuccessScreen";

type FormData = {
  FirstName: string;
  OtherName: string;
  email: string;
  password: string;
  confirmpassword: string;
  GithubUsername: string;
};

type FormErrors = {
  [key in keyof FormData]?: string[];
};
const initialFormState: FormData = {
  FirstName: "",
  OtherName: "",
  email: "",
  password: "",
  confirmpassword: "",
  GithubUsername: "",
};

const initialFormErrors: FormErrors = {};

export default function HackathonRegistration() {
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>(initialFormErrors);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      "https://web3lagosbackend.onrender.com/users/signup/",
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

  if (isSuccess) {
    return (
      <div className="">
        <HackathonSuccessScreen />
      </div>
    );
  }

  return (
    <div className=" grid mx-auto mt-10 max-w-3xl p-6 ">
      <div className=" border border-black rounded-lg w-full bg-white lg:px-8 pt-6 pb-8 mb-4 shadow-[6px_6px_0px_0px_#1ACF2C]">
        <h1 className="text-xl lg:text-4xl font-bold mt-3">
          Create an Account
        </h1>
        <h3 className="mb-8">
          Enter your details to create a Hacker’s account
        </h3>
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
            <div className="flex flex-col  sm: w-full sm:flex-row justify-center items-center space-y-6 sm:space-x-6 sm:space-y-0">
              <div className="w-full sm:w-full">
                <label
                  htmlFor="firstname"
                  className="block mb-2 font-bold text-gray-600 my-8"
                >
                  FirstName
                </label>
                <input
                  type="Firstname"
                  id="Firstname"
                  name="FirstName"
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full p-4 border  border-black shadow-[4px_4px_0px_0px_#1E1E1E] "
                  value={formData.FirstName}
                  required
                />
              </div>
              <div className="w-full sm:w-full">
                <label
                  htmlFor="othername"
                  className="block mb-2 font-bold text-gray-600 my-5"
                >
                  OtherName
                </label>
                <input
                  type="OtherName"
                  id="twitter"
                  name="OtherName"
                  onChange={handleChange}
                  placeholder="jullie Doe"
                  className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E]"
                  value={formData.OtherName}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-x-6 sm:space-y-0">
              <div className="w-full sm:w-full">
                <label
                  htmlFor="email"
                  className="block mb-2 font-bold text-gray-600 my-8"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="twitter"
                  name="email"
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E]"
                  value={formData.email}
                  required
                />
              </div>
              <div className="w-full sm:w-full ">
                <label
                  htmlFor="githubUsername"
                  className="block mb-2 font-bold text-gray-600 my-8"
                >
                  GithubUsername
                </label>
                <input
                  type="text"
                  id="GithubUsername"
                  name="GithubUsername"
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full p-4 border  border-black shadow-[4px_4px_0px_0px_#1E1E1E] "
                  value={formData.GithubUsername}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-x-6 sm:space-y-0">
              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="password"
                  className="block mb-2 font-bold text-gray-600 my-8"
                >
                  password
                </label>
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="twitter"
                    name="password"
                    onChange={handleChange}
                    placeholder="Enter your password."
                    className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E]"
                    value={formData.password}
                    required
                  />

                  <div
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-1/2 ">
                <label
                  htmlFor="confirmpassword"
                  className="block mb-2 font-bold text-gray-600 my-9"
                >
                  Confirm password
                </label>
                <div className="relative w-full">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmpassword"
                    name="confirmpassword"
                    onChange={handleChange}
                    placeholder="confirmpassword."
                    className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E] "
                    value={formData.confirmpassword}
                    required
                  />
                  <div
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center sm:flex-rowspace-y-3 space-x-3">
              <div className="flex">
                <input
                  id="agree-yes"
                  type="checkbox"
                  className="apperance-none checked:bg-blue-500 mt-8"
                  name="agree"
                  value={1}
                  onChange={handleChange}
                />
              </div>
              <label className="block  font-bold text-gray-600 mt-8">
                I agree with Web3 Lagos
                <span className="text-blue-600 px-1 ">User Agreement</span>and
                <span className="text-blue-600 px-1">Privacy Policy</span>
              </label>
            </div>
            <div className="flex items-center sm:flex-rowspace-y-3 space-x-3">
              <div className="flex">
                <input
                  id="agree-yes"
                  type="checkbox"
                  className="apperance-none checked:bg-blue-500 mb-8 mt-2 "
                  name="agree"
                  value={1}
                  onChange={handleChange}
                />
              </div>
              <label className="block  font-bold text-gray-600 mb-8 mt-2 ">
                I am not a Robot
              </label>
            </div>

            <button
              type="submit"
              className="  w-full  p-5  bg-[#1E1E1E]  text-white  text-center shadow-[-5px_-5px_0px_0px_#0096FF]
                 "
              disabled={loading}
            >
              {loading ? "Sending..." : "Create Account"}
            </button>
            <h3 className="text-center m-4">
              Already have an account?
              <Link href="login">
                <span className="text-blue-600 px-1 ">Log In</span>
              </Link>
            </h3>
          </div>
        </form>
      </div>
    </div>
  );
}

