// import dynamic from "next/dynamic";
// import classNames from "utils/classNames";

// const DynamicComponent = dynamic(() => import("react-date-countdown-timer"), {
//   ssr: false,
// });

// interface Props {
//   className?: string;
// }
// const DateCountDown = ({ className = "" }: Props) => {
//   return (
//     <>

//       <div
//         className={classNames(
//           className,
//           " md:p-3 md:mt-0 text-sm"
//         )}
//       >
//         {/* @ts-ignore */}
//         <DynamicComponent dateTo="August 31, 2023 10:00:00 GMT+01:00" />
//       </div>
//     </>
//   );
// };

// export default DateCountDown;

import React, { useEffect, useState } from "react";

interface CountdownProps {
  endDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ endDate }) => {
  const [countdown, setCountdown] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Function to calculate the time remaining until a specific date
  const getTimeRemaining = (
    endDate: Date
  ): { days: number; hours: number; minutes: number; seconds: number } => {
    const total = endDate.getTime() - new Date().getTime();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return { days, hours, minutes, seconds };
  };

  // Function to update the countdown display
  const updateCountdown = (endDate: Date): void => {
    const remainingTime = getTimeRemaining(endDate);
    setCountdown(remainingTime);
  };

  useEffect(() => {
    updateCountdown(endDate);
    const interval = setInterval(() => {
      updateCountdown(endDate);
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <div>
      <p className=" text-xl font-medium tracking-wide">
        {countdown.days} days, {countdown.hours} hours, {countdown.minutes}{" "}
        minutes, {countdown.seconds} seconds
      </p>
    </div>
  );
};

// Example usage:
const endDate = new Date("2024-09-05T00:00:00");

const DateCountDown: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div>
        <div className=" flex items-center justify-center">
          <h1 className=" font-bold text-2xl -mt-4 tracking-wide">
            Countdown Timer
          </h1>
        </div>

        <Countdown endDate={endDate} />
      </div>
    </div>
  );
};

export default DateCountDown;
