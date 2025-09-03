import React from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.js';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-3xl font-bold text-primary font-mono tracking-tight hover:text-primary/80 transition-colors">
            ThinkBoard
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/create" className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>
            
            {user && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm">
                  {user.picture ? (
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <span className="hidden md:block text-base-content/80">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn btn-ghost btn-sm"
                  title="Logout"
                >
                  <LogOut className="size-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
