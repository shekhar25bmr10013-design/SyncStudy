import React, { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { MOCK_CHAT_MESSAGES } from '../../utils/constants';

const ChatBox = () => {
  const [messages, setMessages] = useState(MOCK_CHAT_MESSAGES);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    setMessages([
      ...messages,
      {
        id: Date.now(),
        user: 'You',
        text: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      }
    ]);
    setNewMessage('');
  };

  return (
    <div className="bg-dark-800/40 backdrop-blur-md border border-primary/20 rounded-2xl h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-primary/20">
        <div className="flex items-center space-x-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-white">Study Chat</h3>
        </div>
        <p className="text-xs text-gray-400 mt-1">Stay connected with your group</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 h-80">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md ${msg.isOwn ? 'bg-gradient-to-r from-primary to-accent' : 'bg-dark-800'} rounded-2xl p-3`}>
              {!msg.isOwn && (
                <p className="text-xs text-primary mb-1">{msg.user}</p>
              )}
              <p className="text-sm text-white">{msg.text}</p>
              <p className="text-xs text-gray-300 mt-1">{msg.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-primary/20">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-dark-800 text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white p-2 rounded-xl transition-all"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;
