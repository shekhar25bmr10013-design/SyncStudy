import React from 'react';

const GradientText = ({ children, className = '', as: Tag = 'span' }) => {
  return (
    <Tag className={`bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent ${className}`}>
      {children}
    </Tag>
  );
};

export default GradientText;
