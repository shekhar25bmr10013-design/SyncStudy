import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-md border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to={user ? '/home' : '/'} className="flex items-center space-x-2 group">
            <div className="relative">
              <Users className="h-8 w-8 text-primary group-hover:text-accent transition-colors" />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full -z-10"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              SyncStudy
            </span>
          </Link>

          {user && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm text-gray-300 hidden md:block">
                  {user.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-dark-700 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="h-5 w-5 text-gray-400 hover:text-primary" />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
