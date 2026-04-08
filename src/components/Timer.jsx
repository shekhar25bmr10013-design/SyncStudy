import React from 'react';
import { Play, Pause, RotateCcw, Plus } from 'lucide-react';
import GradientText from '../ui/GradientText';

const Timer = ({ timer }) => {
  const {
    timeLeft,
    formatTime,
    isActive,
    isReady,
    startTimer,
    pauseTimer,
    resetTimer,
    extendTimer,
    setReady
  } = timer;

  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / (25 * 60)) * circumference;

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      {/* Circular Progress Timer */}
      <div className="relative">
        <svg className="w-72 h-72 transform -rotate-90">
          <circle
            cx="144"
            cy="144"
            r={radius}
            fill="none"
            stroke="#1e293b"
            strokeWidth="8"
          />
          <circle
            cx="144"
            cy="144"
            r={radius}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl font-bold font-mono">
            <GradientText>{formatTime()}</GradientText>
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex space-x-4">
        {!isReady ? (
          <button onClick={setReady} className="btn-primary px-8">
            Ready to Study 📚
          </button>
        ) : (
          <>
            {!isActive ? (
              <button
                onClick={startTimer}
                className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full transition-all transform hover:scale-110"
              >
                <Play className="h-6 w-6" />
              </button>
            ) : (
              <button
                onClick={pauseTimer}
                className="bg-yellow-600 hover:bg-yellow-700 text-white p-4 rounded-full transition-all transform hover:scale-110"
              >
                <Pause className="h-6 w-6" />
              </button>
            )}
            
            <button
              onClick={() => resetTimer(25)}
              className="bg-dark-700 hover:bg-dark-600 text-white p-4 rounded-full transition-all transform hover:scale-110"
            >
              <RotateCcw className="h-6 w-6" />
            </button>

            <button
              onClick={() => extendTimer(5)}
              className="bg-gradient-to-r from-primary to-accent text-white p-4 rounded-full transition-all transform hover:scale-110"
            >
              <Plus className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      {/* Status Messages */}
      {isReady && !isActive && (
        <p className="text-accent text-sm animate-pulse">Ready! Click play to start studying 🎯</p>
      )}
      {isActive && (
        <p className="text-primary text-sm animate-pulse">🔥 Stay focused! You're doing great</p>
      )}
    </div>
  );
};

export default Timer;
