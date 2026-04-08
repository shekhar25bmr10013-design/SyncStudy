import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Clock, Shield, Zap, ArrowRight, Sparkles } from 'lucide-react';
import Button from '../components/Button';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Instant Join",
      description: "One tap and you're in a study session with like-minded peers"
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Synced Timer",
      description: "Pomodoro timer that keeps everyone in sync and focused"
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Accountability",
      description: "Check-ins and activity tracking to ensure productivity"
    }
  ];

  return (
    <div className="min-h-screen bg-dark-900 overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary">Study Together. Stay Consistent.</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">SyncStudy</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
              Instantly join focused study sessions with <span className="text-accent">one tap</span> and stay accountable
            </p>
            
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of students who study better together. No more studying alone and losing motivation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/register')} size="lg">
                Get Started <ArrowRight className="h-5 w-5 inline ml-2" />
              </Button>
              <Button onClick={() => navigate('/login')} variant="secondary" size="lg">
                Sign In
              </Button>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-24">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why <span className="gradient-text">SyncStudy</span>?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="glass-card-hover p-6 text-center group">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-primary/10 rounded-2xl group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="glass-card p-6">
              <div className="text-3xl font-bold gradient-text">500+</div>
              <p className="text-gray-400 mt-2">Active Students</p>
            </div>
            <div className="glass-card p-6">
              <div className="text-3xl font-bold gradient-text">1000+</div>
              <p className="text-gray-400 mt-2">Sessions Created</p>
            </div>
            <div className="glass-card p-6">
              <div className="text-3xl font-bold gradient-text">85%</div>
              <p className="text-gray-400 mt-2">Focus Improvement</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
