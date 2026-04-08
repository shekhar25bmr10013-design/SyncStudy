const Session = require('../models/Session');
const Participant = require('../models/Participant');
const Message = require('../models/Message');

const joinSession = async (req, res) => {
  const { subject, duration = 25 } = req.body;
  const userId = req.userId;

  if (!subject) {
    return res.status(400).json({ error: 'Subject is required' });
  }

  const existingSessions = Session.findActiveBySubject(subject);
  let session = existingSessions[0];

  if (session) {
    Participant.add(session.id, userId);
    const participants = Session.getParticipants(session.id);
    res.json({ sessionId: session.id, isNew: false, participants });
  } else {
    session = Session.create(subject, userId, duration);
    Participant.add(session.id, userId);
    res.json({ sessionId: session.id, isNew: true });
  }
};

const markReady = async (req, res) => {
  const { sessionId } = req.body;
  const userId = req.userId;

  Participant.setReady(sessionId, userId);
  
  const readyCount = Participant.countReady(sessionId);
  const totalCount = Participant.countTotal(sessionId);
  
  if (readyCount >= 2 && readyCount === totalCount) {
    Session.startSession(sessionId);
    const io = req.app.get('io');
    io.to(`session_${sessionId}`).emit('sessionStarted', { startTime: new Date() });
  }

  const participants = Session.getParticipants(sessionId);
  res.json({ participants });
};

const extendSession = async (req, res) => {
  const { sessionId, minutes = 5 } = req.body;

  try {
    Session.extendSession(sessionId, minutes);
    
    const io = req.app.get('io');
    io.to(`session_${sessionId}`).emit('sessionExtended', { additionalMinutes: minutes });
    
    res.json({ success: true, message: `Session extended by ${minutes} minutes` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSession = async (req, res) => {
  const { id } = req.params;
  
  const session = Session.findById(id);
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }
  
  const participants = Session.getParticipants(id);
  const messages = Message.getBySession(id);
  
  res.json({
    session,
    participants,
    messages
  });
};

module.exports = {
  joinSession,
  markReady,
  extendSession,
  getSession
};
