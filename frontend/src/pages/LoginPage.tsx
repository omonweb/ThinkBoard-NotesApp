import React from 'react';


const LoginPage: React.FC = () => {
  

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/auth/google`;
  };

  return (
    <div className="min-h-screen flex relative">
      {/* Background Gradient - Same as notes page */}
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
      
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-8 relative z-10">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">ThinkBoard</h1>
            <p className="text-gray-300 mb-8">Your personal note-taking companion</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-white mb-2">Welcome Back</h2>
              <p className="text-gray-300">Sign in to access your notes</p>
            </div>

            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 mb-6"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-400" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white/10 text-gray-300">Or</span>
              </div>
            </div>

            {/* Email Input */}
            <div className="mb-6">
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/10 text-white placeholder-gray-400"
                disabled
              />
            </div>

            {/* Continue Button */}
            <button
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 mb-6"
              disabled
            >
              Continue
            </button>

            {/* Footer */}
            <div className="text-center">
              <p className="text-sm text-gray-300">
                Already have an account?{' '}
                <button className="text-blue-400 hover:text-blue-300 font-medium">
                  Log in
                </button>
              </p>
            </div>

            {/* Terms */}
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-400">
                By signing in, you agree to our{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 relative z-10">
        <div className="max-w-lg w-full">
          {/* Notes Board Illustration */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-2xl p-6 mb-6 border border-white/20">
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">My Notes</h3>
                <div className="w-8 h-8 bg-blue-400/20 rounded-full flex items-center justify-center">
                  <span className="text-blue-300 text-sm font-medium">+</span>
                </div>
              </div>
              
              {/* Note Items */}
              <div className="space-y-2">
                <div className="flex items-center p-3 bg-green-400/10 rounded-lg border-l-4 border-green-400">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Project Ideas</p>
                    <p className="text-xs text-gray-300">Brainstorming session notes...</p>
                  </div>
                  <div className="w-6 h-6 bg-green-400/20 rounded-full"></div>
                </div>
                
                <div className="flex items-center p-3 bg-yellow-400/10 rounded-lg border-l-4 border-yellow-400">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Meeting Notes</p>
                    <p className="text-xs text-gray-300">Weekly team sync...</p>
                  </div>
                  <div className="w-6 h-6 bg-yellow-400/20 rounded-full"></div>
                </div>
                
                <div className="flex items-center p-3 bg-red-400/10 rounded-lg border-l-4 border-red-400">
                  <div className="w-3 h-3 bg-red-400 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Todo List</p>
                    <p className="text-xs text-gray-300">Important tasks to complete...</p>
                  </div>
                  <div className="w-6 h-6 bg-red-400/20 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="relative">
            {/* Yellow Circle */}
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
            </div>
            
            {/* Green Block */}
            <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-green-400 rounded-lg"></div>
            
            {/* Dashed Lines */}
            <div className="absolute top-0 left-0 w-32 h-32 border-2 border-blue-400/50 border-dashed rounded-full opacity-50"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
