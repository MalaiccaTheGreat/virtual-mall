// components/Unauthorized.jsx
export default function Unauthorized() {
    const location = useLocation();
    
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Forbidden</h1>
        <p className="text-lg mb-8">
          You don't have permission to access {location.pathname}
        </p>
        <Link to="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg">
          Return Home
        </Link>
      </div>
    );
  }