import React, { useEffect, useState } from "react";

// Define the type for the props of DateBlock
type DateBlockProps = {
  timeStamp: number;
  text: string;
};

// Define the DateBlock component
const DateBlock: React.FC<DateBlockProps> = ({ timeStamp, text }) => {
  const formattedTime = String(timeStamp).padStart(2, "0");
  return (
    <div className="py-3 px-5 lg:px-8 text-black md:text-[25px]">
      <h1 className="text-[1.4em]">{formattedTime}</h1>
      <p className="">{text}</p>
    </div>
  );
};

// Define the type for the props of Countdown
interface CountdownProps {
  endDate: Date;
}

// Countdown component
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
    <div className="bg-[#ffffff] w-[80vw] md:w-[80vw] h-[14vh] text-black border-[4px] py-16 rounded-[10px] text-[0.8em] font-bold flex items-center justify-between text-center border-[#188BE0] pr-10 md:pr-5 xl:px-60">
      <DateBlock timeStamp={0} text="Days" />:{" "}
      <DateBlock timeStamp={0} text="Hours" />:
      <DateBlock timeStamp={0} text="Mins" />:{" "}
      <DateBlock timeStamp={0} text="Secs" />
    </div>
  );
};

// DateCountDown component now takes endDate as a prop
interface DateCountDownProps {
  endDate: Date;
}

const DateCountDown: React.FC<DateCountDownProps> = ({ endDate }) => {
  return (
    <div className="flex items-center justify-between my-2 absolute -top-14 ">
      <div>
        <div className="flex items-center justify-between"></div>
        <Countdown endDate={endDate} />
      </div>
    </div>
  );
};

export default DateCountDown;
