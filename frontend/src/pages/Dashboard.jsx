import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';
import SessionCard from '../components/session/SessionCard';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import GradientText from '../components/ui/GradientText';
import { MOCK_SESSIONS, SESSION_DURATIONS } from '../utils/constants';
import { getGreeting } from '../utils/helpers';
import { BookOpen, Clock } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [duration, setDuration] = useState(25);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [sessions] = useState(MOCK_SESSIONS);

  const handleJoinSession = (sessionId) => {
    navigate(`/session/${sessionId}`);
  };

  const handleCreateSession = () => {
    if (!subject.trim()) {
      alert('Please enter a subject');
      return;
    }
    const newSessionId = Date.now().toString();
    navigate(`/session/${newSessionId}`, { state: { subject, duration } });
  };

  const greeting = getGreeting();

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      
      <div className="pt-20 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {greeting}, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-gray-400 mt-2">Ready to stay consistent today?</p>
          </div>

          {/* Create Session Button */}
          <div className="mb-8">
            <Button onClick={() => setShowCreateModal(true)}>
              Start / Join Sync Session
            </Button>
          </div>

          {/* Active Sessions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">🔥 Active Study Sessions</h2>
              <span className="text-sm text-primary">{sessions.length} session(s) live</span>
            </div>

            {sessions.length === 0 ? (
              <div className="bg-dark-800/40 backdrop-blur-md border border-primary/20 rounded-2xl p-8 text-center">
                <p className="text-gray-400">No active sessions. Create one to start studying!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sessions.map((session) => (
                  <SessionCard
                    key={session.id}
                    session={session}
                    onJoin={handleJoinSession}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Session Modal */}
      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Create Study Session">
        <div className="space-y-4">
          <Input
            label="Subject"
            placeholder="e.g., Data Structures, Calculus, Physics"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            icon={BookOpen}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Duration ⏱️
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="w-full bg-dark-800/50 border border-primary/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            >
              {SESSION_DURATIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button onClick={handleCreateSession} className="flex-1">
              Create & Start
            </Button>
            <Button variant="secondary" onClick={() => setShowCreateModal(false)} className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
