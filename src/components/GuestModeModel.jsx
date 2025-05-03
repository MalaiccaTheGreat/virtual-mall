import { XIcon } from '@heroicons/react/outline';

export default function GuestModeModal({ isOpen, onClose, onContinue, onSignup }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <XIcon className="h-6 w-6" />
        </button>

        <h3 className="text-xl font-bold mb-4">Continue as Guest?</h3>
        <p className="mb-6">
          Your cart items will be temporary. Create an account to save your cart and access exclusive features.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onContinue}
            className="flex-1 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Continue as Guest
          </button>
          <button
            onClick={onSignup}
            className="flex-1 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Sign Up Now
          </button>
        </div>
      </div>
    </div>
  );
}