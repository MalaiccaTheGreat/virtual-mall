import { useAuth } from '@/Context';
import { Link } from 'react-router-dom';

const GuestBanner = () => {
  const { isGuest } = useAuth();

  if (!isGuest) return null;

  return (
    <div className="bg-blue-50 p-3 text-center border-b border-blue-100">
      <span>You're browsing as a guest. </span>
      <Link to="/signup" className="text-blue-600 underline font-medium">
        Sign up
      </Link>
      <span> to save your cart and access exclusive features.</span>
    </div>
  );
};

export default GuestBanner;