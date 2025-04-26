// filepath: c:\Users\ACER\Desktop\Python\virtual-mall\src\components\Dropdown.jsx
import React, { useState, useRef } from 'react';
import { useFloating, autoUpdate, offset, flip, size, arrow, hide } from '@floating-ui/react-dom';
import { motion } from 'framer-motion';

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null); // Ref for the arrow element
  const { x, y, refs, strategy, middlewareData } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'bottom-start',
    middleware: [
      offset(5),
      flip(),
      size({
        apply({ elements }) {
          elements.floating.style.minWidth = `${elements.reference.offsetWidth}px`;
        },
      }),
      arrow({ element: arrowRef }), // Add arrow middleware
      hide(), // Add hide middleware to hide dropdown when out of view
    ],
    whileElementsMounted: autoUpdate,
  });

  return (
    <div className="relative">
      <button
        ref={refs.setReference}
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Menu
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          ref={refs.setFloating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
          }}
          className="bg-white shadow-lg rounded py-1 relative"
        >
          {/* Arrow Element */}
          <div
            ref={arrowRef}
            className="absolute bg-white w-3 h-3 rotate-45"
            style={{
              top: middlewareData.arrow?.y ?? 0,
              left: middlewareData.arrow?.x ?? 0,
              transform: 'translate(-50%, -50%)',
            }}
          />
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Item 1</button>
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Item 2</button>
        </motion.div>
      )}
    </div>
  );
}