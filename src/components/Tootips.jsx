// filepath: c:\Users\ACER\Desktop\Python\virtual-mall\src\components\Tooltip.jsx
import React, { useState } from 'react';
import { useFloating, autoUpdate, offset, shift } from '@floating-ui/react-dom';

export default function Tooltip() {
  const [isOpen, setIsOpen] = useState(false);
  const { x, y, refs, strategy } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'top',
    middleware: [offset(10), shift()],
    whileElementsMounted: autoUpdate,
  });

  return (
    <>
      <button
        ref={refs.setReference}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        Hover me
      </button>
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            width: 'max-content',
          }}
          className="bg-gray-800 text-white px-2 py-1 rounded text-sm"
        >
          Tooltip content
        </div>
      )}
    </>
  );
}