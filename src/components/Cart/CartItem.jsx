import React from 'react';

export default function CartItem({ item, onRemove, onUpdateQuantity }) {
  return (
    <div className="flex items-center justify-between mb-4 border-b pb-2">
      <div>
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-gray-600">
          ${item.price.toFixed(2)} x {item.quantity}
        </p>
        <div className="flex items-center mt-2">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="px-2 py-1 border rounded text-gray-600 hover:bg-gray-100"
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className="mx-2">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="px-2 py-1 border rounded text-gray-600 hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="text-red-500 hover:underline"
      >
        Remove
      </button>
    </div>
  );
}