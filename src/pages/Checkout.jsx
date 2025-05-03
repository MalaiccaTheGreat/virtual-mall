import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useCart } from '@/Context';

export default function Checkout() {
  const { cart, removeFromCart, updateQuantity, cartTotal, getGuestItems } = useCart();
  const { isGuest } = useAuth();
  const navigate = useNavigate();

  const guestItems = getGuestItems();
  const hasGuestItems = guestItems.length > 0;

  const handleProceed = () => {
    if (isGuest) {
      navigate('/guest-checkout');
    } else {
      navigate('/payment');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      
      {hasGuestItems && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-yellow-700">
            You have {guestItems.length} temporary item(s) in your cart. 
            <button 
              onClick={() => navigate('/signup')}
              className="ml-2 font-semibold underline"
            >
              Sign up
            </button> to save them permanently.
          </p>
        </div>
      )}

      {cart.length > 0 ? (
        <div>
          <div className="mb-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between mb-4 border-b pb-2"
              >
                <div className="flex items-center space-x-4">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                    {item.size && <p className="text-sm text-gray-600">Size: {item.size}</p>}
                    {item.color && (
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-gray-600 mr-2">Color:</span>
                        <div 
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: item.color }}
                        />
                      </div>
                    )}
                    {item.isGuestItem && (
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded">
                        Temporary
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 border rounded text-gray-600 hover:bg-gray-100"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 border rounded text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center border-t pt-4">
            <h2 className="text-xl font-bold">Total: ${cartTotal.toFixed(2)}</h2>
            <button
              onClick={handleProceed}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              {isGuest ? 'Continue as Guest' : 'Proceed to Payment'}
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}