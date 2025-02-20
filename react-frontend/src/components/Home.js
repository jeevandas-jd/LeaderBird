import React from "react";
import { Trophy, LogIn, UserPlus, GamepadIcon } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center space-y-8">
          {/* Logo and Title */}
          <div className="flex items-center justify-center space-x-3">
            <Trophy className="h-12 w-12 text-blue-600" />
            <h1 className="text-5xl font-bold text-gray-900">
              Leader<span className="text-blue-600">Bird</span>
            </h1>
          </div>

          {/* Tagline */}
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Organize and manage your tournaments with ease. Create brackets, track scores, 
            and crown champions all in one place.
          </p>

          {/* Main CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => window.location.href = "/create-game"}
              className="group relative flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-200 text-lg font-medium w-full sm:w-auto"
            >
              <GamepadIcon className="h-5 w-5" />
              Create Tournament
            </button>

            <button
              onClick={() => window.location.href = "/signin"}
              className="group relative flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition duration-200 text-lg font-medium w-full sm:w-auto"
            >
              <LogIn className="h-5 w-5" />
              Sign In
            </button>
          </div>

          {/* Secondary Action */}
          <div className="pt-4">
            <button
              onClick={() => window.location.href = "/signup"}
              className="inline-flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600 transition duration-200"
            >
              <UserPlus className="h-5 w-5" />
              New to LeaderBird? Create an account
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition duration-200">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Tournament Brackets</h3>
            <p className="text-gray-600">Create and manage professional tournament brackets with ease</p>
          </div>

          <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition duration-200">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <GamepadIcon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Real-time Updates</h3>
            <p className="text-gray-600">Track scores and standings in real-time as matches progress</p>
          </div>

          <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition duration-200">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <UserPlus className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Team Management</h3>
            <p className="text-gray-600">Easily manage teams, players, and tournament participants</p>          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;