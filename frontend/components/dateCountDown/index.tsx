import React, { useEffect, useState } from "react";

// Define the type for the props
type DateBlockProps = {
  timeStamp: number;
  text: string;
};

// Define the DateBlock component
const DateBlock: React.FC<DateBlockProps> = ({ timeStamp, text }) => {

  const formattedTime = String(timeStamp).padStart(2, '0');
  return (
    <div className="py-3 px-5 lg:px-8 text-white">
      <h1 className="text-[1.4em]">{formattedTime}</h1>
      <p className="">{text}</p>
    </div>
  );
};

// Countdown component
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
    <div className=" border-[#3E3797] border-[2px] bg-gradient-to-br from-[#3E3797] via-[#111022] to-[#111022] rounded-[10px] text-white text-[0.8em] font-bold flex items-center justify-between text-center">
      <DateBlock timeStamp={countdown.days} text="Days" />: <DateBlock timeStamp={countdown.hours} text="Hours" />:<DateBlock timeStamp={countdown.minutes} text="Mins" />: <DateBlock timeStamp={countdown.seconds} text="Secs" />
    </div>
  );
};

const endDate = new Date("2024-09-05T00:00:00");

const DateCountDown: React.FC = () => {
  return (
    <div className="flex items-center justify-between my-2">
      <div>
        <div className="flex items-center justify-between">
        </div>
        <Countdown endDate={endDate} />
      </div>
    </div>
  );
};

export default DateCountDown;
