/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import SuccessScreen from "./successScreen";
import React from "react";
import Category from "./category";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  validateEmail,
  validatePhoneNumber,
  validateURL,
  validateXHandle,
  validateTelegramId,
  validateRequired,
  validateTextLength,
  validateSessionAbstract,
  validatePitchStory,
  validateProfilePic
} from '../../utils/validation';

type FormData = {
  firstname: string;
  other_name: string;
  email: string;
  title: string;
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
  [key: string]: string[] | undefined;
};

const initialFormState: FormData = {
  firstname: "",
  other_name: "",
  email: "",
  title: "",
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
  "Talk (15 + 5 QA)(20 minutes)",
  "Workshop 1hr",
  "Lightning Talk (5-10 minutes",
  "Panel",
];

const validateForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {};

  // Required fields validation
  if (!validateRequired(formData.firstname)) {
    errors.firstname = ['First name is required'];
  }

  if (!validateRequired(formData.other_name)) {
    errors.other_name = ['Other names are required'];
  }

  if (!validateRequired(formData.title)) {
    errors.title = ['Title is required'];
  }

  if (!validateEmail(formData.email)) {
    errors.email = ['Please enter a valid email address'];
  }

  if (!validatePhoneNumber(formData.phone_number)) {
    errors.phone_number = ['Please enter a valid phone number'];
  }

  if (!validateURL(formData.website_or_portfolio)) {
    errors.website_or_portfolio = ['Please enter a valid URL'];
  }

  if (!validateXHandle(formData.x_handle)) {
    errors.x_handle = ['Please enter a valid X handle (e.g., @username) or X/Twitter profile URL'];
  }

  if (!validateRequired(formData.lecture_title)) {
    errors.lecture_title = ['Lecture title is required'];
  }

  if (!validateRequired(formData.category)) {
    errors.category = ['Category is required'];
  }

  if (!validateSessionAbstract(formData.session_abstract)) {
    errors.session_abstract = ['Session abstract must be between 1000 and 10000 characters, or N/A if not applicable'];
  }

  if (!validateRequired(formData.web3_role)) {
    errors.web3_role = ['Web3 role is required'];
  }

  if (!validateRequired(formData.location)) {
    errors.location = ['Location is required'];
  }

  if (!validateTelegramId(formData.telegram_id)) {
    errors.telegram_id = ['Please enter a valid Telegram ID'];
  }

  if (!validatePitchStory(formData.pitch_story)) {
    errors.pitch_story = ['Pitch story must be between 300 and 5000 characters, or N/A if not applicable'];
  }

  if (!validateRequired(formData.gender)) {
    errors.gender = ['Gender is required'];
  }

  if (!validateRequired(formData.session_type)) {
    errors.session_type = ['Session type is required'];
  }

  return errors;
};

interface CategoryProps {
  id: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => Promise<void>;
  value: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function ApplyAsaSpeaker() {
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>(initialFormErrors);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const uploadImageToCloudinary = async (imageFile: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append(
      'upload_preset',
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
    );
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CLOUDINARY_API_URL}/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
  
      if (!response.ok) {
        throw new Error('Image upload failed');
      }
  
      const data = await response.json();
      return data.secure_url; // Return the URL of the uploaded image
    } catch (error) {
      console.error('Image upload error:', error);
      throw new Error('Image upload failed');
    }
  };
  

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
  
    if (name === 'profilepicurl' && files && files[0]) {
      if (!validateProfilePic(files[0])) {
        toast.error('Please upload a valid image file (JPEG, PNG, or GIF) under 5MB');
        return;
      }
      try {
        const imageUrl = await uploadImageToCloudinary(files[0]);
        setFormData((prev) => ({
          ...prev,
          profilepicurl: imageUrl,
        }));
        toast.success('Image uploaded successfully!');
      } catch (error) {
        toast.error('Image upload failed. Please try again.');
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  
    // Validate the field immediately
    const fieldErrors = validateForm({ ...formData, [name]: value });
    setErrors(prev => ({
      ...prev,
      [name]: fieldErrors[name],
    }));
  };
  

  const scrollToError = (fieldName: string) => {
    const element = document.getElementById(fieldName);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    
    // Check if there are any errors
    if (Object.keys(validationErrors).length > 0) {
      toast.error('Please fix the errors in the form');
      // Scroll to the first error
      const firstErrorField = Object.keys(validationErrors)[0];
      scrollToError(firstErrorField);
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const updatedFormData = {
        ...formData,
        available_at_any_day: formData.available_at_any_day === 'true',
        spoken_at_web3_before: formData.spoken_at_web3_before === 'true',
      };
  
      const response = await fetch(
        'https://giant-dorice-web3bridge-89722e9a.koyeb.app/api/speaker-registrations/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedFormData),
        }
      );
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success('Registration successful!');
        setMessage('Registration successful!');
        setFormData(initialFormState);
        setIsSuccess(true);
      } else {
        // Handle different types of backend errors
        if (data.email && data.email.includes('already exists')) {
          setErrors({ email: ['This email is already registered as a speaker'] });
          toast.error('This email is already registered as a speaker');
          scrollToError('email');
        } else if (data.non_field_errors) {
          // Handle general non-field errors
          toast.error(data.non_field_errors.join(', '));
        } else {
          // Handle field-specific errors
          const formattedErrors: FormErrors = {};
          Object.keys(data).forEach(key => {
            if (Array.isArray(data[key])) {
              formattedErrors[key] = data[key];
            } else {
              formattedErrors[key] = [data[key]];
            }
          });
          setErrors(formattedErrors);
          
          // Show the first error in a toast and scroll to it
          const firstErrorField = Object.keys(formattedErrors)[0];
          const firstError = formattedErrors[firstErrorField]?.[0];
          if (firstError) {
            toast.error(firstError);
            scrollToError(firstErrorField);
          }
        }
        setMessage('Registration failed. Please check the errors above.');
      }
    } catch (error) {
      toast.error('An error occurred while submitting the form. Please try again.');
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = () => {
    setFormData(initialFormState);
  };

  if (isSuccess) {
    return (
      <div className="w-full m-auto h-screen justify-center align-middle items-center flex">
        
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
      <ToastContainer />
      <div className="w-full flex-col flex items-center justify-center text-center">
        <h1 className="mb-2 w-full bg-gradient-to-r text-[2em] text-transparent bg-clip-text text-center font-semibold from-[#895470] via-[#BD6854] to-[#3E3797]">
          Web3 Lagos Conference 4.0: Speaker Form
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
              <div className="w-full sm:w-1/3">
                <label className="block mb-2 font-bold text-gray-600">
                  First Name <span className="text-red-600">* </span>
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your first name"
                  className={`w-full p-3 border ${errors.firstname && touched.firstname ? 'border-red-500' : 'border-gray-300'} rounded-xl shadow`}
                  value={formData.firstname}
                  required
                />
                {errors.firstname && touched.firstname && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>
                )}
              </div>
              <div className="w-full sm:w-1/3">
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
                  onBlur={handleBlur}
                  placeholder="Other names"
                  className={`w-full p-3 border ${errors.other_name && touched.other_name ? 'border-red-500' : 'border-gray-300'} rounded-xl shadow`}
                  value={formData.other_name}
                />
                {errors.other_name && touched.other_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.other_name}</p>
                )}
              </div>
              <div className="w-full sm:w-1/3">
                <label
                  htmlFor="other_name"
                  className="block mb-2 font-bold text-gray-600">
                  Your Title<span className="text-red-600">* </span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your title e.g(Mr, Mrs, Dr, Prof etc)"
                  className={`w-full p-3 border ${errors.title && touched.title ? 'border-red-500' : 'border-gray-300'} rounded-xl shadow`}
                  value={formData.title}
                />
                {errors.title && touched.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
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
                  onBlur={handleBlur}
                  placeholder="Enter your email."
                  className={`w-full p-3 border ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'} rounded-xl shadow`}
                  value={formData.email}
                  required
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
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
                  onBlur={handleBlur}
                  placeholder="Enter your phone number."
                  className={`w-full p-3 border ${errors.phone_number && touched.phone_number ? 'border-red-500' : 'border-gray-300'} rounded-xl`}
                  value={formData.phone_number}
                  required
                />
                {errors.phone_number && touched.phone_number && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>
                )}
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
                  onBlur={handleBlur}
                  placeholder="Enter your company name."
                  className={`w-full p-3 border ${errors.company_name && touched.company_name ? 'border-red-500' : 'border-gray-300'} rounded-xl shadow`}
                  onChange={handleChange}
                  value={formData.company_name}
                />
                {errors.company_name && touched.company_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.company_name}</p>
                )}
              </div>

              <div className="w-full sm:w-1/2">
                <label className="block mb-2 font-bold text-gray-600 my-5">
                  Link to Your Website or Link to Your (Portfolio/Resume/GitHub)
                </label>
                <input
                  type="text"
                  id="website_or_portfolio"
                  name="website_or_portfolio"
                  onBlur={handleBlur}
                  className={`w-full p-3 border ${errors.website_or_portfolio && touched.website_or_portfolio ? 'border-red-500' : 'border-gray-300'} rounded-xl shadow`}
                  onChange={handleChange}
                  value={formData.website_or_portfolio}
                />
                {errors.website_or_portfolio && touched.website_or_portfolio && (
                  <p className="text-red-500 text-sm mt-1">{errors.website_or_portfolio}</p>
                )}
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
                  onBlur={handleBlur}
                  placeholder="Your X handle"
                  className={`w-full p-3 border ${errors.x_handle && touched.x_handle ? 'border-red-500' : 'border-gray-300'} rounded-xl shadow`}
                  onChange={handleChange}
                  value={formData.x_handle}
                />
                {errors.x_handle && touched.x_handle && (
                  <p className="text-red-500 text-sm mt-1">{errors.x_handle}</p>
                )}
              </div>
              <div className="w-full sm:w-1/2">
                <label className="block mb-2 font-bold text-gray-600 my-5">
                  Lecture Title <span className="text-red-600">* </span>
                </label>
                <input
                  type="text"
                  id="lecture_title"
                  name="lecture_title"
                  onBlur={handleBlur}
                  placeholder="The title of your lecture."
                  className={`w-full p-3 border ${errors.lecture_title && touched.lecture_title ? 'border-red-500' : 'border-gray-300'} rounded-xl shadow`}
                  onChange={handleChange}
                  value={formData.lecture_title}
                  required
                />
                {errors.lecture_title && touched.lecture_title && (
                  <p className="text-red-500 text-sm mt-1">{errors.lecture_title}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 mt-6 sm:space-x-6 sm:space-y-0">
              <div className="w-full">
                <Category
                  id="category"
                  name="category"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={formData.category}
                />
                {errors.category && touched.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                )}
              </div>
              <div className="w-full">
                <label
                  htmlFor="session_type"
                  className="block mb-2 font-bold text-gray-600">
                  Session Type
                  <span className="text-red-600">* </span>
                </label>
                <select
                  id="session_type"
                  name="session_type"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={`w-full p-3 border ${errors.session_type && touched.session_type ? 'border-red-500' : 'border-gray-300'} rounded-xl shadow`}
                  value={formData.session_type}
                  required>
                  <option value="">Select your session type</option>
                  {sessiontype.map((session) => (
                    <option key={session} value={session}>
                      {session}
                    </option>
                  ))}
                </select>
                {errors.session_type && touched.session_type && (
                  <p className="text-red-500 text-sm mt-1">{errors.session_type}</p>
                )}
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
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Brief description of your session."
                  className={`w-full p-3 border ${errors.session_abstract && touched.session_abstract ? 'border-red-500' : 'border-gray-300'} rounded-xl shadow`}
                  value={formData.session_abstract}
                  rows={8}
                />
                {errors.session_abstract && touched.session_abstract && (
                  <p className="text-red-500 text-sm mt-1">{errors.session_abstract}</p>
                )}
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
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={`w-full p-3 border ${errors.web3_role && touched.web3_role ? 'border-red-500' : 'border-gray-300'} rounded-xl shadow`}
                  value={formData.web3_role}
                  required>
                  <option value="">Select your role</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                {errors.web3_role && touched.web3_role && (
                  <p className="text-red-500 text-sm mt-1">{errors.web3_role}</p>
                )}
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
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={`w-full p-3 border ${errors.available_at_any_day && touched.available_at_any_day ? 'border-red-500' : 'border-gray-300'} rounded-xl shadow`}
                  value={String(formData.available_at_any_day)}
                  required>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                {errors.available_at_any_day && touched.available_at_any_day && (
                  <p className="text-red-500 text-sm mt-1">{errors.available_at_any_day}</p>
                )}
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
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter your location"
                  className={`w-full p-3 border ${errors.location && touched.location ? 'border-red-500' : 'border-gray-300'} rounded-xl shadow`}
                  value={formData.location || ''}
                  required
                />
                {errors.location && touched.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                )}
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
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter your telegram id."
                  className={`w-full p-3 border ${errors.telegram_id && touched.telegram_id ? 'border-red-500' : 'border-gray-300'} rounded-xl shadow`}
                  value={formData.telegram_id || ''}
                  required
                />
                {errors.telegram_id && touched.telegram_id && (
                  <p className="text-red-500 text-sm mt-1">{errors.telegram_id}</p>
                )}
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
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Share your story with us."
                  className={`w-full p-3 border ${errors.pitch_story && touched.pitch_story ? 'border-red-500' : 'border-gray-300'} rounded-xl shadow`}
                  value={formData.pitch_story}
                />
                {errors.pitch_story && touched.pitch_story && (
                  <p className="text-red-500 text-sm mt-1">{errors.pitch_story}</p>
                )}
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
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={`w-full p-3 border ${errors.spoken_at_web3_before && touched.spoken_at_web3_before ? 'border-red-500' : 'border-gray-300'} rounded-xl shadow`}
                  value={String(formData.spoken_at_web3_before)}
                  required>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                {errors.spoken_at_web3_before && touched.spoken_at_web3_before && (
                  <p className="text-red-500 text-sm mt-1">{errors.spoken_at_web3_before}</p>
                )}
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
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={`w-full p-3 border ${errors.gender && touched.gender ? 'border-red-500' : 'border-gray-300'} rounded-xl shadow`}
                  value={formData.gender}
                  required>
                  <option value="">Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="female">Others</option>
                </select>
                {errors.gender && touched.gender && (
                  <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                )}
              </div>
              <div className="w-full sm:w-1/2">
            <label
              htmlFor="profilepicurl"
              className="block mb-2 font-bold text-gray-600 my-5">
              Profile Pic <span className="text-red-600">*</span>
            </label>
            <input
              type="file"
              id="profilepicurl"
              name="profilepicurl"
              onBlur={handleBlur}
              accept="image/*"
              onChange={handleChange}
              className={`w-full p-3 border ${errors.profilepicurl && touched.profilepicurl ? 'border-red-500' : 'border-gray-300'} rounded-xl shadow`}
            />
            {errors.profilepicurl && touched.profilepicurl && (
              <p className="text-red-500 text-sm mt-1">{errors.profilepicurl}</p>
            )}
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
