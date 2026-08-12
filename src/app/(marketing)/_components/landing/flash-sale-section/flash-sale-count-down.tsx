"use client";
import { useState, useEffect } from "react";

/**
 * @returns {object}
 */
const calculateTimeRemaining = () => {
  // 1. Get the current time
  const now = new Date();

  // 2. Set the target time to 11:59:59 PM (23:59:59) today
  const target = new Date();
  target.setHours(23, 59, 59, 999); // Set the time to 23:59:59.999

  // 3. Calculate the difference in milliseconds
  const difference = target.getTime() - now.getTime();

  const timeRemaining = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    isMidnight: difference <= 0,
  };

  if (difference > 0) {
    // Calculate hours, minutes, and seconds from the difference
    timeRemaining.hours = Math.floor(difference / (1000 * 60 * 60));
    timeRemaining.minutes = Math.floor((difference / (1000 * 60)) % 60);
    timeRemaining.seconds = Math.floor((difference / 1000) % 60);
  }

  return timeRemaining;
};

const CountdownToMidnight = () => {
  // Avoid SSR/CSR hydration mismatch by initializing deterministically,
  // then calculating on the client after mount.
  const [time, setTime] = useState(() => ({
    hours: 0,
    minutes: 0,
    seconds: 0,
    isMidnight: false,
  }));

  useEffect(() => {
    setTime(calculateTimeRemaining());
    // Set up an interval to update the time every 1000 milliseconds (1 second)
    const timer = setInterval(() => {
      setTime(calculateTimeRemaining());
    }, 1000);

    // Clean up the interval when the component unmounts or the effect re-runs
    return () => clearInterval(timer);
  }, []); // Empty dependency array means this effect runs only once on mount

  // Simple function to add a leading zero if the number is less than 10
  const formatTime = (value: number) => String(value).padStart(2, "0");
  // Destructure for cleaner access
  const { hours, minutes, seconds, isMidnight } = time;

  return (
    <div className="inline-flex items-center gap-0.5 md:gap-1">
      <div className="flex flex-col items-center">
        <div className="min-w-[28px] rounded-md border border-slate-200 bg-[#209AEA]/10 px-1.5 py-0.5 md:min-w-[32px] md:px-2 md:py-1">
          <span
            className="text-sm font-bold tabular-nums text-slate-900 md:text-lg"
            aria-label="Hours"
          >
            {formatTime(hours)}
          </span>
        </div>
        <span className="mt-0.5 text-[9px] font-medium uppercase text-slate-500">
          h
        </span>
      </div>

      <span className="pb-3 text-sm font-bold text-slate-400 md:pb-4 md:text-lg">
        :
      </span>

      <div className="flex flex-col items-center">
        <div className="min-w-[28px] rounded-md border border-slate-200 bg-[#209AEA]/10 px-1.5 py-0.5 md:min-w-[32px] md:px-2 md:py-1">
          <span
            className="text-sm font-bold tabular-nums text-slate-900 md:text-lg"
            aria-label="Minutes"
          >
            {formatTime(minutes)}
          </span>
        </div>
        <span className="mt-0.5 text-[9px] font-medium uppercase text-slate-500">
          m
        </span>
      </div>

      <span className="pb-3 text-sm font-bold text-slate-400 md:pb-4 md:text-lg">
        :
      </span>

      <div className="flex flex-col items-center">
        <div className="min-w-[28px] rounded-md border border-slate-200 bg-[#209AEA]/10 px-1.5 py-0.5 md:min-w-[32px] md:px-2 md:py-1">
          <span
            className="text-sm font-bold tabular-nums text-slate-900 md:text-lg"
            aria-label="Seconds"
          >
            {formatTime(seconds)}
          </span>
        </div>
        <span className="mt-0.5 text-[9px] font-medium uppercase text-slate-500">
          s
        </span>
      </div>
    </div>
  );
};

export default CountdownToMidnight;
