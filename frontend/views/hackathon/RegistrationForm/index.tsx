/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Link from "next/link";
import React from "react";
import { EyeOff, Eye } from "lucide-react";
import HackathonSuccessScreen from "./SuccessScreen";
import BackgroundColor from "@/components/hackathon-bg";

type FormData = {
  first_name: string;
  other_name: string;
  email: string;
  password: string;
  confirmpassword: string;
  github_username: string;
  web3_knowledge: string;
  hacking_role: string;
};

type FormErrors = {
  [key in keyof FormData]?: string;
};

const initialFormState: FormData = {
  first_name: "",
  other_name: "",
  email: "",
  password: "",
  confirmpassword: "",
  github_username: "",
  web3_knowledge: "",
  hacking_role: "",
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
    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        [name]: value,
      };

      // Handle password confirmation validation
      if (name === "password" || name === "confirmpassword") {
        if (updatedFormData.password !== updatedFormData.confirmpassword) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            confirmpassword: "Passwords do not match",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            confirmpassword: undefined,
          }));
        }
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: undefined,
        }));
      }

      return updatedFormData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrors(initialFormErrors);

    // Validate passwords match
    if (formData.password !== formData.confirmpassword) {
      setErrors({
        ...errors,
        confirmpassword: "Passwords do not match",
      });
      setLoading(false);
      return;
    }

    const response = await fetch(
      "https://giant-dorice-web3bridge-89722e9a.koyeb.app/users/signup/",
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
      <div className="mx-auto min-h-screen flex items-center justify-center">
        <HackathonSuccessScreen />
      </div>
    );
  }

  const isSubmitDisabled = loading || !!errors.confirmpassword;
  
  

    
  
    const handleGoBack = () => {
      window.history.back();
    };
  
    return (
      <main className=" relative flex flex-col min-h-screen overflow-hidden ">

      <BackgroundColor />
{/* <div className="w-full m-auto gap-8 items-center justify-center align-middle flex flex-col">

        <div className="m-auto text-red-500 text-[3em]">Registration Closed</div>
        <button
          onClick={handleGoBack}
          className=" hover:bg-[#0000ff] bg-[#06062f] w-fit m-auto text-white font-bold py-2 px-4 rounded-lg"
        >
          Go Back
        </button>
</div> */}

  

      <div className="w-full mx-auto mt-10 max-w-3xl p-6">
        <div className="border border-black rounded-lg  bg-[#fff] lg:px-8 pt-6 pb-8 mb-4 shadow-[6px_6px_0px_0px_#1ACF2C]">
          <h1 className="text-xl lg:text-4xl font-bold mt-3">
            Create an Account
          </h1>
          <h3 className="mb-4 font-bold">
            Enter your details to create a Hacker’s account
          </h3>
          <div className="text-center">
            {!!message && (
              <span
                className={`text-${
                  message.includes("successful") ? "[#00ff00]" : "[#ff0000]"
                }`}
              >
                {message}
              </span>
            )}
          </div>
          <form onSubmit={handleSubmit} className="">
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-x-6 sm:space-y-0">
              <div className="w-full sm:w-full">
                <label
                  htmlFor="first_name"
                  className="block mb-2 font-bold text-gray-600 my-8"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E]"
                  value={formData.first_name}
                  required
                />
                {errors.first_name && (
                  <p className="text-red-500 text-sm absolute">
                    {errors.first_name}
                  </p>
                )}
              </div>
              <div className="w-full sm:w-full">
                <label
                  htmlFor="other_name"
                  className="block mb-2 font-bold text-gray-600 my-8"
                >
                  Other Names
                </label>
                <input
                  type="text"
                  id="other_name"
                  name="other_name"
                  onChange={handleChange}
                  placeholder="Jullie Doe"
                  className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E]"
                  value={formData.other_name}
                  required
                />
                {errors.other_name && (
                  <p className="text-red-500 text-sm absolute">
                    {errors.other_name}
                  </p>
                )}
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
                  id="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E]"
                  value={formData.email}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm absolute">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="w-full sm:w-full">
                <label
                  htmlFor="github_username"
                  className="block mb-2 font-bold text-gray-600 my-8"
                >
                  Github Username
                </label>
                <input
                  type="text"
                  id="github_username"
                  name="github_username"
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E]"
                  value={formData.github_username}
                  required
                />
                {errors.github_username && (
                  <p className="text-red-500 text-sm absolute">
                    {errors.github_username}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-x-6 sm:space-y-0">
              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="password"
                  className="block mb-2 font-bold text-gray-600 my-8"
                >
                  Password
                </label>
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Enter your password"
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
                {errors.password && (
                  <p className="text-red-500 text-sm absolute">
                    {errors.password}
                  </p>
                )}
              </div>
              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="confirmpassword"
                  className="block mb-2 font-bold text-gray-600 my-9"
                >
                  Confirm Password
                </label>
                <div className="relative w-full">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmpassword"
                    name="confirmpassword"
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E]"
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
                {errors.confirmpassword && (
                  <p className="text-red-500 text-sm absolute">
                    {errors.confirmpassword}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="web3_knowledge"
                className="block mb-2 font-bold text-gray-600 my-4"
              >
                Web3 Knowledge
              </label>
              <select
                id="web3_knowledge"
                name="web3_knowledge"
                onChange={handleChange}
                value={formData.web3_knowledge}
                className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E]"
                required
              >
                <option value="" disabled>
                  Select your knowledge level
                </option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              {errors.web3_knowledge && (
                <p className="text-red-500 text-sm absolute">
                  {errors.web3_knowledge}
                </p>
              )}
            </div>
            <div className="mb-16 ">
              <label
                htmlFor="hacking_role"
                className="block mb-2 font-bold text-gray-600 my-4"
              >
                Hacking Role
              </label>
              <select
                id="hacking_role"
                name="hacking_role"
                onChange={handleChange}
                value={formData.hacking_role}
                className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E]"
                required
              >
                <option value="" disabled>
                  Select your role
                </option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Project Manager">Project Manager</option>
              </select>
              {errors.hacking_role && (
                <p className="text-red-500 text-sm absolute">
                  {errors.hacking_role}
                </p>
              )}
            </div>
            <button
              type="submit"
              className={`w-full p-5 bg-[#1E1E1E] text-center shadow-[-5px_-5px_0px_0px_#0096FF] text-white font-bold rounded-lg hover:bg-green-600 transition duration-300 ${
                isSubmitDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitDisabled}
            >
              {loading ? "Submitting..." : "Create Account"}
            </button>
            <h3 className="text-center m-4">
              Already have an account?
              <Link href="login">
                <span className="text-blue-600 px-1 ">Log In</span>
              </Link>
            </h3>
          </form>
        </div>
      </div>
    </main>
  );
}
