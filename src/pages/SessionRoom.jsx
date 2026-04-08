import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Timer from '../components/session/Timer';
import ChatBox from '../components/session/ChatBox';
import Participants from '../components/session/Participants';
import { useTimer } from '../hooks/useTimer';
import { ArrowLeft, Users } from 'lucide-react';

const SessionRoom = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { subject, duration } = location.state || { subject: 'Study Session', duration: 25 };
  
  const timer = useTimer(duration);

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      
      <div className="pt-20 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Back Button & Session Info */}
          <div className="mb-6">
            <button
              onClick={() => navigate('/home')}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </button>
            
            <div className="bg-dark-800/40 backdrop-blur-md border border-primary/20 rounded-2xl p-4">
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                📚 {subject}
              </h1>
              <div className="flex items-center space-x-4 mt-2">
                <p className="text-gray-400 text-sm">
                  Session ID: {id}
                </p>
                <div className="flex items-center space-x-1 text-gray-400 text-sm">
                  <Users className="h-4 w-4" />
                  <span>4 participants</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Timer */}
            <div className="lg:col-span-2">
              <div className="bg-dark-800/40 backdrop-blur-md border border-primary/20 rounded-2xl p-8">
                <Timer timer={timer} />
              </div>
            </div>

            {/* Right Column - Participants & Chat */}
            <div className="space-y-6">
              <Participants />
              <ChatBox />
            </div>
          </div>

          {/* Study Tips */}
          <div className="mt-6 bg-dark-800/40 backdrop-blur-md border border-primary/20 rounded-2xl p-4">
            <p className="text-sm text-gray-400">
              💡 <span className="text-primary">Pro tip:</span> Take a 5-minute break after each session to stay refreshed!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionRoom;
