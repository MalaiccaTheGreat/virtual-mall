import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import logo from '../assets/images/Logo.jpg';
import background from '../assets/images/Background.jpg';
import virtualAssistant from '../assets/images/virtual-assistant.png';

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
      className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 35, 102, 0.85), rgba(0, 20, 60, 0.9)), url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Force background color fallback */}
      <div className="absolute inset-0 bg-primary-950 -z-10"></div>
      
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

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Logo and Heading */}
        <img src={logo} alt="Pulse & Threads Logo" className="h-28 mx-auto mb-8 drop-shadow-lg" />
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Welcome to <span className="text-gold-500">Pulse & Threads</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl text-gold-200 mb-12 max-w-2xl mx-auto">
          Experience shopping like never before with our immersive virtual technology
        </p>
        
        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <button className="btn-primary">
            Virtual Assistant
          </button>
          <button 
            onClick={enterGuestMode}
            className="btn-primary"
          >
            Get Started
          </button>
          <Link
            to="/signup"
            className="btn-secondary"
          >
            Create Account
          </Link>
        </div>
        
        {/* Virtual Assistant Image */}
        <div className="flex justify-center">
          <img 
            src={virtualAssistant} 
            alt="Virtual Assistant" 
            className="w-64 h-64 animate-float" 
          />
        </div>
      </div>
    </div>
  );
}