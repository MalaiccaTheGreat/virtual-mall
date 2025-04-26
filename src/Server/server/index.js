const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock Jenga API credentials
const JENGA_API_KEY = 'your_jenga_key';
const JENGA_ACCOUNT = 'your_merchant_code';

app.post('/mobile-money', async (req, res) => {
  const { phone, network, amount, currency } = req.body;

  // Validate input
  if (!phone || !network || !amount || !currency) {
    return res.status(400).json({ success: false, message: 'Invalid input' });
  }

  try {
    // Simulate Jenga API call
    const response = await axios.post(
      'https://sandbox.jengahq.io/transaction/v2/mobilemoney',
      {
        source: {
          countryCode: 'ZM',
          name: 'Customer',
          accountNumber: phone,
        },
        destination: {
          type: 'mobile',
          countryCode: 'ZM',
          name: 'Your Store',
          accountNumber: JENGA_ACCOUNT,
          mobileOperator: network.toUpperCase(), // MTN/AIRTEL/ZAMTEL
        },
        transfer: {
          type: 'MobileMoney',
          amount: amount.toFixed(2),
          currency,
          reference: `ORD-${Date.now()}`,
          description: 'Online purchase',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${JENGA_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Respond with success
    res.json({
      success: true,
      transactionId: response.data.transactionId || `TXN-${Date.now()}`,
      message: 'Payment successful',
    });
  } catch (error) {
    console.error('Payment error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: error.response?.data?.message || 'Payment processing failed',
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Payment server running on port ${PORT}`);
});