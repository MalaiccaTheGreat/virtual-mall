export default function Modal({ title, message, show, onClose, actions = [] }) {
    if (!show) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="mb-6">{message}</p>
          <div className="flex justify-end space-x-3">
            {actions.map((action, i) => (
              <button
                key={i}
                onClick={action.onClick}
                className={`px-4 py-2 rounded ${
                  action.variant === 'primary' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200'
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }