import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function Welcome() {
  // Animation effects could be added here
  useEffect(() => {
    document.title = "Welcome to Virtual Mall";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl text-center mb-12">
        <h1 className="text-5xl font-bold text-purple-800 mb-6 animate-fadeIn">
          Welcome to Pulse & Threads
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Experience shopping like never before with our immersive virtual try-on technology
        </p>
        
        <div className="relative w-64 h-64 mx-auto mb-10">
          <img 
            src="/assets/virtual-assistant.png" 
            alt="Virtual Assistant"
            className="w-full h-full object-contain animate-float"
          />
        </div>
        
        <div className="flex justify-center gap-6">
          <Link 
            to="/login" 
            className="px-8 py-3 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl"
          >
            Get Started
          </Link>
          <Link 
            to="/signup" 
            className="px-8 py-3 border-2 border-purple-600 text-purple-600 rounded-full font-medium hover:bg-purple-50 transition-all"
          >
            Create Account
          </Link>
        </div>
      </div>
      
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            {icon: '👗', title: 'Virtual Try-On', desc: 'See how clothes look on you'},
            {icon: '🤖', title: 'AI Assistant', desc: 'Get personalized recommendations'},
            {icon: '🚀', title: 'Fast Checkout', desc: 'Secure and quick payments'}
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md w-56">
              <span className="text-4xl mb-3 block">{item.icon}</span>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center text-white bg-black bg-opacity-50 p-8 rounded-xl">
          <p className="text-xl mb-6">
            Experience shopping like never before with our immersive virtual try-on technology
          </p>
          
          <div className="space-y-4">
            <Link 
              to="/login" 
              className="block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
            >
              Get Started
            </Link>
            <Link 
              to="/signup" 
              className="block border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}