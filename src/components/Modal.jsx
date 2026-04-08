import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, children, title }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-dark-800/90 backdrop-blur-md border border-primary/20 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-300">
        {title && (
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {title}
            </h3>
            <button 
              onClick={onClose} 
              className="p-1 hover:bg-dark-700 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-white" />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
