import { useEffect, useState } from "react";

const calcTimeLeft = (t) => {
  if (!t) return 0;

  const left = t - new Date().getTime();

  if (left < 0) return 0;

  return left;
};

export const useCountdown = (expTime) => {
  const [endTime, setEndTime] = useState(expTime);
  const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft(endTime));
  let timer;

  const stopTimer = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  useEffect(() => {
    setTimeLeft(calcTimeLeft(endTime));

    timer = setInterval(() => {
      const targetLeft = calcTimeLeft(endTime);
      setTimeLeft(targetLeft);

      if (targetLeft === 0) stopTimer();
    }, 1000);

    return () => {
      if (timer) stopTimer();
    };
  }, [endTime]);

  return [timeLeft, setEndTime];
};
