import { useState } from 'react';
import { auth } from '../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

export default function PhoneAuth({ onSuccess }) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Format for Zambian numbers
      const formattedPhone = `+260${phone.substring(1)}`;
      
      const recaptcha = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });

      const confirmation = await signInWithPhoneNumber(
        auth, 
        formattedPhone, 
        recaptcha
      );
      
      onSuccess(confirmation);
      alert('OTP sent to your phone!');
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Zambian Phone Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Phone Number</label>
          <input
            type="tel"
            placeholder="0961234567"
            pattern="(096|097|095|076|077|075)\d{7}"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Format: 096xxxxxxx, 097xxxxxxx, or 095xxxxxxx
          </p>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Sending OTP...' : 'Send OTP'}
        </button>
      </form>
      <div id="recaptcha-container"></div>
    </div>
  );
}