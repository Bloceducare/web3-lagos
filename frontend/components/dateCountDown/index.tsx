import React, { useEffect, useState, useCallback } from "react";

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

  const getTimeRemaining = useCallback((
    endDate: Date
  ): { days: number; hours: number; minutes: number; seconds: number } => {
    const total = endDate.getTime() - new Date().getTime();
    
    // If the event has passed, return all zeros
    if (total <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return { days, hours, minutes, seconds };
  }, []);

  const updateCountdown = useCallback((endDate: Date): void => {
    const remainingTime = getTimeRemaining(endDate);
    setCountdown(remainingTime);
  }, [getTimeRemaining]);

  useEffect(() => {
    updateCountdown(endDate);
    
    // Check if the event has already passed
    const total = endDate.getTime() - new Date().getTime();
    if (total <= 0) {
      return; // Don't set up interval if event has passed
    }
    
    const interval = setInterval(() => {
      updateCountdown(endDate);
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate, updateCountdown]);

  return (
    <div className="bg-gradient-to-r from-[#FFFFFF] to-[#1E82ED] w-full h-[100px] md:h-[140px] text-black border-[4px] rounded-[10px] text-[0.8em] font-bold flex items-center justify-between text-center border-[#188BE0] md:px-5 xl:px-40">
      <DateBlock timeStamp={countdown.days} text="Days" />:{" "}
      <DateBlock timeStamp={countdown.hours} text="Hours" />:
      <DateBlock timeStamp={countdown.minutes} text="Mins" />:{" "}
      <DateBlock timeStamp={countdown.seconds} text="Secs" />
    </div>
  );
};

// DateCountDown component now takes endDate as a prop
interface DateCountDownProps {
  endDate: Date;
  eventPassedMessage?: string;
}

const DateCountDown: React.FC<DateCountDownProps> = ({ endDate, eventPassedMessage }) => {
  const total = endDate.getTime() - new Date().getTime();
  const eventHasPassed = total <= 0;

  if (eventHasPassed && eventPassedMessage) {
    return (
      <div className="flex items-center justify-between w-full">
        <div className="bg-gradient-to-r from-[#FFFFFF] to-[#1E82ED] w-full h-[100px] md:h-[140px] text-black border-[4px] rounded-[10px] text-[0.8em] font-bold flex items-center justify-center text-center border-[#188BE0] md:px-5 xl:px-40">
          <p className="text-xl font-bold">{eventPassedMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between w-full">
      <Countdown endDate={endDate} />
    </div>
  );
};

export default DateCountDown;
