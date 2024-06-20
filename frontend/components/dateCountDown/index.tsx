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
    <div className="p-4 text-black">
      <h1 className="text-[2em]">{formattedTime}</h1>
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
    <div className="bg-header border-yellow-500 border-[0.2px] rounded-[10px] text-black text-[1em] font-bold w-fit flex items-center text-center">
      <DateBlock timeStamp={countdown.days} text="Days" />: <DateBlock timeStamp={countdown.hours} text="Hours" />:<DateBlock timeStamp={countdown.minutes} text="Mins" />: <DateBlock timeStamp={countdown.seconds} text="Secs" />
    </div>
  );
};

const endDate = new Date("2024-09-05T00:00:00");

const DateCountDown: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div>
        <div className="flex items-center justify-center">
        </div>
        <Countdown endDate={endDate} />
      </div>
    </div>
  );
};

export default DateCountDown;
