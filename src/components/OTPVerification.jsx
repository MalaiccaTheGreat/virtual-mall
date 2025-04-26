import { useState } from 'react';

export default function OTPVerification({ confirmationResult, onVerified }) {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const verifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await confirmationResult.confirm(otp);
      onVerified();
      alert('Login successful!');
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
      <form onSubmit={verifyOTP} className="space-y-4">
        <div>
          <label className="block mb-1">6-digit OTP</label>
          <input
            type="text"
            placeholder="123456"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 border rounded"
            maxLength={6}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>
    </div>
  );
}