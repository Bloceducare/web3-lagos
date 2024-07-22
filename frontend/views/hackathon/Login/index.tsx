/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import React from "react";
import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";

type FormData = {
  email: string;
  password: string;
};

type User = {
  email: string;
  id: number;
  first_name: string;
  github_username:string;
  other_name: string;
}
type FormErrors = {
  [key in keyof FormData]?: string[];
};
const initialFormState: FormData = {
  email: "",
  password: "",
};

const initialFormErrors: FormErrors = {};

export default function HackathonLogin() {
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>(initialFormErrors);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter()

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
      "https://web3lagosbackend.onrender.com/users/signin/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();
    console.log(data)

    if (response.ok) {
      localStorage.setItem("token", data.accesss_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      /**
       * to retrive user data from locl storage ensure
       * to parse the strigified json data since local storage
       * can not store other data types than strings
       * console.log("user id is:", JSON.parse(user));
       */
      setMessage("Login successful!");
     
      setFormData(initialFormState);
      setIsSuccess(true); 
      router.push({
        pathname:"/hackathon/dashboard"
      })
    } else {
      setErrors(data);
      setMessage("Please  check your details  and try again.");
    }

    setLoading(false);
  };

  return (
    <div className=" mx-auto mt-10 max-w-3xl p-6">
      <div className=" border border-black rounded-lg w-full bg-white lg:px-8 pt-6 pb-8 mb-4 shadow-[6px_6px_0px_0px_#1ACF2C]">
        <h1 className="text-xl lg:text-4xl font-bold mt-3">Login</h1>
        <h3 className="mb-8">Enter your details to login to your account</h3>
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
          <div className="w-full ">
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
          <div className="w-full">
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
                className="w-full p-4 border border-black  shadow-[4px_4px_0px_0px_#1E1E1E]"
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
            <Link href="forgotpassword">
              <h3 className="text-right text-blue-600"> Forgot Password?</h3>
            </Link>
            <button
              type="submit"
              className="  w-full mt-12 p-6  bg-[#1E1E1E]  text-white  text-center shadow-[-5px_-5px_0px_0px_#0096FF]
                 "
              disabled={loading}
            >
              {loading ? "Sending..." : "LogIn"}
            </button>
            <h3 className="text-center m-4">
              Don’t have an account?
              <Link href="hackathon/registration">
                <span className="text-blue-600 px-1 ">Sign Up</span>
              </Link>
            </h3>
          </div>
        </form>
      </div>
    </div>
  );
}
