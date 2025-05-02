// src/pages/Profile.jsx
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { currentUser } = useAuth();
  const [recentItems, setRecentItems] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Mock data fetching
        const mockRecentItems = [
          { id: 1, name: 'Summer Dress', image: '/dress1.jpg', viewed: '2 days ago' },
          { id: 2, name: 'Denim Jacket', image: '/jacket1.jpg', viewed: '1 week ago' },
        ];

        const mockRecommendations = [
          { id: 3, name: 'Casual Sneakers', image: '/shoes1.jpg', reason: 'Matches your style' },
          { id: 4, name: 'Wide-brim Hat', image: '/hat1.jpg', reason: 'Popular with your favorites' },
        ];

        setRecentItems(mockRecentItems);
        setRecommendations(mockRecommendations);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError('Failed to load profile data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewItem = (id) => {
    navigate(`/product/${id}`);
  };

  if (!currentUser || isLoading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-32"></div>
          <div className="px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center">
            <div className="relative -mt-16 mb-4 sm:mb-0 sm:mr-6">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center overflow-hidden">
                {currentUser.photoURL ? (
                  <img src={currentUser.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-5xl text-purple-600">
                    {currentUser.displayName?.charAt(0).toUpperCase() || 'U'}
                  </span>
                )}
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {currentUser.displayName || currentUser.email.split('@')[0]}!
              </h1>
              <p className="text-gray-600 mt-1">
                Member since {new Date(currentUser.metadata.creationTime).toLocaleDateString()}
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  Premium Shopper
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  Fashion Explorer
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Personalized Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recently Viewed */}
          <div className="lg:col-span-2 bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recently Viewed</h2>
            {error && <p className="text-red-500">{error}</p>}
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : recentItems.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {recentItems.map((item) => (
                  <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">Viewed {item.viewed}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No recently viewed items</p>
            )}
          </div>

          {/* Recommendations */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Just For You</h2>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : recommendations.length > 0 ? (
              <div className="space-y-4">
                {recommendations.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.reason}</p>
                      <button
                        className="mt-1 text-sm text-purple-600 hover:text-purple-800"
                        onClick={() => handleViewItem(item.id)}
                      >
                        View item
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No recommendations yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}