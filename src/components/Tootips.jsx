import React, { useState } from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  shift,
  arrow,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingArrow
} from '@floating-ui/react';

export default function Tooltip({ content, children, placement = 'top' }) {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = React.useRef(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    middleware: [
      offset(8),
      shift({ padding: 8 }),
      arrow({ element: arrowRef })
    ],
    whileElementsMounted: autoUpdate
  });

  const hover = useHover(context);
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role
  ]);

  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className="inline-block"
      >
        {children}
      </div>
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="z-50 max-w-xs bg-gray-900 text-white text-sm px-3 py-2 rounded pointer-events-none"
        >
          <FloatingArrow
            ref={arrowRef}
            context={context}
            fill="#111827" // bg-gray-900
          />
          {content}
        </div>
      )}
    </>
  );
}