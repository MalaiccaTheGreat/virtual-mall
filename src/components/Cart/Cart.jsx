import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Cart({ items, onClose, onRemove }) {
  // Calculate total price
  const subtotal = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white p-6 shadow-lg overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black transition-colors"
            aria-label="Close cart"
          >
            <X size={24} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cart Items List */}
            <div className="divide-y">
              {items.map((item) => (
                <div key={item.id} className="py-4 flex justify-between items-start">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    {/* Product Info */}
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-600">${item.price.toFixed(2)}</p>

                      {/* Quantity Controls */}
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => onRemove(item.id)}
                          className="text-sm text-red-500 hover:text-red-700 mr-4"
                        >
                          Remove
                        </button>

                        {item.quantity && (
                          <div className="flex items-center border rounded">
                            <button
                              className="px-2 py-1 hover:bg-gray-100"
                              onClick={() => {
                                if (item.quantity > 1) {
                                  onRemove({ ...item, quantity: item.quantity - 1 });
                                } else {
                                  onRemove(item.id);
                                }
                              }}
                            >
                              -
                            </button>
                            <span className="px-2">{item.quantity}</span>
                            <button
                              className="px-2 py-1 hover:bg-gray-100"
                              onClick={() => onRemove({ ...item, quantity: item.quantity + 1 })}
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="font-medium">
                    ${((item.price * (item.quantity || 1)).toFixed(2))}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Link
              to="/checkout"
              className="block w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 text-center font-medium transition-colors"
              onClick={onClose}
            >
              Proceed to Checkout
            </Link>

            {/* Continue Shopping */}
            <button
              onClick={onClose}
              className="w-full text-center text-blue-600 hover:text-blue-800 mt-2"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}