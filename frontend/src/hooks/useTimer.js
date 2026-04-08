import { useState, useEffect, useRef } from 'react';

export const useTimer = (initialMinutes = 25) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const intervalRef = useRef(null);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    if (timeLeft <= 0) return;
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = (minutes = initialMinutes) => {
    setIsActive(false);
    setTimeLeft(minutes * 60);
    setIsReady(false);
  };

  const extendTimer = (minutes = 5) => {
    setTimeLeft(prev => prev + (minutes * 60));
  };

  const setReady = () => {
    setIsReady(true);
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, timeLeft]);

  return {
    timeLeft,
    formatTime,
    isActive,
    isReady,
    startTimer,
    pauseTimer,
    resetTimer,
    extendTimer,
    setReady
  };
};
