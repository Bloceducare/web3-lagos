// // import React, { useState, ChangeEvent } from 'react';
// // import DatePicker from 'react-datepicker';
// // import 'react-datepicker/dist/react-datepicker.css';

// // const DateSelectionForm: React.FC = () => {
// //   const [agree, setAgree] = useState<boolean>(false);
// //   const [selectedDate, setSelectedDate] = useState<Date | null>(null);

// //   const handleAgreeChange = (e: ChangeEvent<HTMLInputElement>) => {
// //     setAgree(e.target.checked);
// //     if (!e.target.checked) {
// //       setSelectedDate(null);
// //     }
// //   };

// //   const handleDateChange = (date: Date | null) => {
// //     setSelectedDate(date);
// //   };

// //   const today = new Date();
// //   const maxDate = new Date();
// //   maxDate.setDate(today.getDate() + 70);

// //   return (
// //     <form className="p-4 max-w-lg mx-auto bg-white shadow-md rounded">
// //       <div className="mb-5">
        
// //         <div className="flex items-center mb-4">
// //           <input
// //             type="radio"
// //             id="agree"
// //             name="agree"
// //             checked={agree}
// //             onChange={handleAgreeChange}
// //             className="mr-2"
// //           />
// //           <label className="block mb-2 font-bold text-gray-600">
// //           I agree to submit my presentation prior to the Conference.
// //         </label>
// //         </div>
// //         {agree && (
// //           <div className="mt-2">
// //             <DatePicker
// //               selected={selectedDate}
// //               onChange={handleDateChange}
// //               minDate={today}
// //               maxDate={maxDate}
// //               placeholderText="Select a date"
// //               className="block w-full p-3 mt-1 border border-gray-300 rounded"
// //               required
// //             />
// //           </div>
// //         )}
// //       </div>
// //       <button
// //         type="submit"
// //         disabled={!agree || !selectedDate}
// //         className={`mt-4 p-2 bg-blue-500 text-white rounded ${(!agree || !selectedDate) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
// //       >
// //         Submit
// //       </button>
// //     </form>
// //   );
// // };
// import React from "react";
// import {DatePicker} from "@nextui-org/react";

// export default function DateSelectionForm() {
//   return (
//     <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
//       <DatePicker 
//         label="Birth date"
//         className="max-w-[284px]"
//         isInvalid
//         errorMessage="Please enter a valid date."
//       />
//     </div>
//   );
// }


// // export default DateSelectionForm;

