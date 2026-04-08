import React, { useState, useEffect } from 'react';
import { Users, UserCheck, UserX, Crown } from 'lucide-react';
import Modal from '../common/Modal';
import { MOCK_PARTICIPANTS, ACCOUNTABILITY_INTERVAL } from '../../utils/constants';

const Participants = () => {
  const [participants, setParticipants] = useState(MOCK_PARTICIPANTS);
  const [showPopup, setShowPopup] = useState(false);
  const [currentUser] = useState({ id: 2, name: 'You' });

  // Accountability popup every 10 minutes (demo: every 10 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setShowPopup(true);
    }, ACCOUNTABILITY_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const handleStillStudying = () => {
    setShowPopup(false);
    // In production: mark current user as active in backend
  };

  const activeCount = participants.filter(p => p.isActive).length;

  return (
    <>
      <div className="bg-dark-800/40 backdrop-blur-md border border-primary/20 rounded-2xl">
        {/* Header */}
        <div className="p-4 border-b border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-white">Participants</h3>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-primary">{activeCount} online</span>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
          {participants.map((participant) => (
            <div key={participant.id} className="flex items-center justify-between p-2 hover:bg-dark-700/50 rounded-xl transition-all">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold">
                    {participant.name.charAt(0)}
                  </div>
                  {participant.isActive && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-dark-800"></div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-white flex items-center gap-1">
                    {participant.name}
                    {participant.isCreator && <Crown className="h-3 w-3 text-yellow-500" />}
                    {participant.id === currentUser.id && (
                      <span className="text-xs text-primary ml-1">(You)</span>
                    )}
                  </p>
                  <p className="text-xs flex items-center gap-1">
                    {participant.isActive ? (
                      <span className="text-green-400 flex items-center gap-1">
                        <UserCheck className="h-3 w-3" /> Studying
                      </span>
                    ) : (
                      <span className="text-gray-500 flex items-center gap-1">
                        <UserX className="h-3 w-3" /> Away
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accountability Modal */}
      <Modal isOpen={showPopup} onClose={() => setShowPopup(false)}>
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📚</span>
          </div>
          <h3 className="text-2xl font-bold mb-2">Still Studying?</h3>
          <p className="text-gray-300 mb-6">Click below to confirm you're staying focused!</p>
          <button onClick={handleStillStudying} className="btn-primary w-full">
            Yes, I'm focused! ✅
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Participants;
