import { useState } from 'react';
import axios from 'axios';

export default function MobileMoneyPayment({ amount, onSuccess }) {
  const [phone, setPhone] = useState('');
  const [network, setNetwork] = useState('mtn');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handlePayment = async () => {
    setIsProcessing(true);
    setError('');
    
    try {
      // Replace with your actual API endpoint
      const response = await axios.post('https://virtual-mall-api.onrender.com/mobile-money', {
        phone,
        network,
        amount,
        currency: 'ZMW'
      });

      if (response.data.success) {
        onSuccess(response.data.transactionId);
      } else {
        setError(response.data.message || 'Payment failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Mobile Money Payment</h3>
      
      <div>
        <label className="block mb-1">Mobile Network</label>
        <select
          value={network}
          onChange={(e) => setNetwork(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="mtn">MTN Money</option>
          <option value="airtel">Airtel Money</option>
          <option value="zamtel">Zamtel Kwacha</option>
        </select>
      </div>

      <div>
        <label className="block mb-1">Phone Number</label>
        <input
          type="tel"
          placeholder="0961234567"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handlePayment}
        disabled={!phone || isProcessing}
        className={`w-full py-2 rounded ${
          !phone || isProcessing
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-purple-600 hover:bg-purple-700 text-white'
        }`}
      >
        {isProcessing ? 'Processing...' : 'Pay via Mobile Money'}
      </button>

      <p className="text-sm text-gray-500">
        You'll receive a payment prompt on your phone
      </p>
    </div>
  );
}