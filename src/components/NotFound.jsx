import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-300 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="backdrop-blur-md bg-white/30 border border-white/20 rounded-2xl shadow-lg p-10 text-center space-y-6"
      >
        <h1 className="text-6xl font-extrabold text-blue-700">404</h1>
        <p className="text-2xl text-gray-700">Page not found</p>
        <Link 
          to="/" 
          className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
        >
          Return Home
        </Link>
      </motion.div>
    </div>
  );
}
