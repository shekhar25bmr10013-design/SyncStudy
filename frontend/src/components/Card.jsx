import React from 'react';

const Card = ({ children, className = '', hover = false, onClick }) => {
  return (
    <div
      className={`bg-dark-800/40 backdrop-blur-md border border-primary/20 rounded-2xl shadow-xl ${hover ? 'hover:border-primary/40 hover:shadow-primary/10 hover:shadow-lg transition-all duration-300 cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
