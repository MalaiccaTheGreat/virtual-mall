import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import logo from '../assets/images/Logo.jpg';
import background from '../assets/images/Background.jpg';
import virtualAssistant from '../assets/images/virtual-assistant.png'; // Add this import

export default function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Welcome to Pulse & Threads";
  }, []);

  const enterGuestMode = () => {
    sessionStorage.setItem('guestMode', 'true');
    navigate('/products');
  };

  return (
    <div 
      className="relative min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-6 overflow-hidden"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 35, 102, 0.85), rgba(0, 20, 60, 0.9)), url(${background})`,
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-gold-500/10"
            style={{
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Brand Header */}
      <div className="flex flex-col items-center z-10 mb-8 animate-fade-in">
        <img 
          src={logo} 
          alt="Pulse & Threads Logo" 
          className="h-28 mb-6 drop-shadow-lg transition-transform hover:scale-105 duration-300" 
        />
        <h1 className="text-5xl md:text-6xl font-bold text-white text-center mb-2 font-serif">
          Welcome to <span className="text-gold-400">Pulse & Threads</span>
        </h1>
        <p className="text-xl text-gold-200 max-w-2xl text-center">
          Experience luxury shopping with our revolutionary virtual try-on technology
        </p>
      </div>

      {/* Virtual Assistant Illustration */}
      <div className="relative w-72 h-72 mb-12 z-10 animate-fade-in">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-full animate-pulse"></div>
        <img 
          src={virtualAssistant} 
          alt="Virtual Assistant"
          className="relative z-10 w-full h-full object-contain animate-float"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-6 z-10 mb-16 animate-fade-in-up">
        <button
          onClick={enterGuestMode}
          className="px-10 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-blue-900 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform group-hover:scale-125" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span className="text-lg">Explore as Guest</span>
        </button>

        <Link
          to="/signup"
          className="px-10 py-4 border-2 border-gold-500 text-gold-100 hover:bg-gold-500 hover:text-blue-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform group-hover:scale-125" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-lg">Create Account</span>
        </Link>
      </div>

      {/* Features Section */}
      <div className="w-full max-w-5xl z-10 animate-fade-in-up delay-300">
        <h2 className="text-3xl font-bold text-white text-center mb-10 font-serif">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {icon: '👗', title: 'Virtual Try-On', desc: 'See how clothes look on you in real-time with our AR technology'},
            {icon: '👑', title: 'Premium Selection', desc: 'Access exclusive designer collections and limited editions'},
            {icon: '⚡', title: 'Instant Checkout', desc: 'Secure one-click purchasing with multiple payment options'}
          ].map((item, index) => (
            <div 
              key={index} 
              className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all hover:-translate-y-2 hover:shadow-lg"
            >
              <span className="text-5xl mb-4 block">{item.icon}</span>
              <h3 className="font-bold text-xl text-gold-300 mb-3">{item.title}</h3>
              <p className="text-white/90">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <p className="mt-16 text-white/70 text-sm z-10 animate-fade-in">
        © {new Date().getFullYear()} Pulse & Threads. All rights reserved.
      </p>

      {/* Add these styles to your global CSS or CSS-in-JS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        .delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </div>
  );
}