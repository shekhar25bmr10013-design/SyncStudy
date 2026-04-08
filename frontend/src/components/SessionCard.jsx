import React from 'react';
import { Users, Clock, BookOpen, ArrowRight } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

const SessionCard = ({ session, onJoin }) => {
  return (
    <Card hover className="p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-white">{session.subject}</h3>
        </div>
        <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded-full">
          Live 🔴
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-gray-400 text-sm">
          <Users className="h-4 w-4" />
          <span>{session.participants} participant(s)</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-400 text-sm">
          <Clock className="h-4 w-4" />
          <span>{session.duration} min session</span>
        </div>
      </div>

      <Button variant="secondary" size="sm" onClick={() => onJoin(session.id)} className="w-full group">
        <span>Join Session</span>
        <ArrowRight className="h-4 w-4 inline ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </Card>
  );
};

export default SessionCard;
