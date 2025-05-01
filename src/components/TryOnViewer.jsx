import React, { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';

const TryOnViewer = ({ productImage, mockupImage, onAddToCart, onRecommend }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [measurements, setMeasurements] = useState({
    height: 170,
    chest: 90,
    waist: 70,
    hips: 95, // Added for better fitting
  });
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('try-on'); // 'try-on' or 'recommendations'
  const [fitRating, setFitRating] = useState(null);

  // Memoized handler for image upload
  const handleImageUpload = useCallback((event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => reader.result && setUploadedImage(reader.result);
    reader.readAsDataURL(file);
  }, []);

  // Optimized measurement handler
  const handleMeasurementChange = useCallback((e) => {
    const { name, value } = e.target;
    setMeasurements(prev => ({
      ...prev,
      [name]: Math.max(0, parseInt(value) || 0),
    }));
  }, []);

  // Enhanced recommendation fetcher
  const fetchRecommendations = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('https://virtual-mall-api.onrender.com/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: uploadedImage, measurements }),
      });

      const data = await response.json();
      setRecommendations(data.recommendations);
      setActiveTab('recommendations');
      onRecommend?.(data.recommendations);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, [uploadedImage, measurements, onRecommend]);

  // Calculate product scaling based on measurements
  const productScale = useMemo(() => ({
    transform: `scale(${measurements.height / 170})`,
    width: `${measurements.chest / 2}%`,
  }), [measurements]);

  return (
    <div className="try-on-viewer" role="region" aria-label="Virtual fitting room">
      <h2 className="text-xl font-bold mb-4">Virtual Fitting Room</h2>
      
      {/* Tab Navigation */}
      <div className="flex border-b mb-4">
        <button
          className={`py-2 px-4 ${activeTab === 'try-on' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('try-on')}
          aria-selected={activeTab === 'try-on'}
        >
          Try On
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'recommendations' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('recommendations')}
          aria-selected={activeTab === 'recommendations'}
          disabled={recommendations.length === 0}
        >
          Recommendations
        </button>
      </div>

      {/* Main Content Area */}
      <div className="viewer-container flex flex-col md:flex-row gap-8">
        {/* Left Panel - Try On */}
        {activeTab === 'try-on' && (
          <div className="flex-1">
            <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
              {uploadedImage ? (
                <>
                  <img
                    src={uploadedImage}
                    alt="User upload"
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                    aria-hidden="true"
                  />
                  <img
                    src={mockupImage}
                    alt="Clothing mockup"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                    aria-hidden="true"
                  />
                  <img
                    src={productImage}
                    alt="Product preview"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                    style={productScale}
                  />
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Upload your image to begin
                </div>
              )}
            </div>

            {/* Image Upload with Better UI */}
            <label className="block mt-4">
              <span className="sr-only">Upload your photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            {/* Enhanced Measurement Inputs */}
            <fieldset className="mt-6 p-4 border rounded-lg">
              <legend className="font-medium px-2">Your Measurements (cm)</legend>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(measurements).map(([key, value]) => (
                  <label key={key} className="block">
                    <span className="text-sm capitalize">{key}:</span>
                    <input
                      type="number"
                      name={key}
                      value={value}
                      onChange={handleMeasurementChange}
                      min="0"
                      className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Fit Rating */}
            {uploadedImage && (
              <div className="mt-4">
                <p className="text-sm">How does it fit?</p>
                <div className="flex gap-2 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setFitRating(star)}
                      className={`p-1 ${fitRating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                      aria-label={`Rate fit ${star} out of 5`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 mt-6">
              <button
                onClick={fetchRecommendations}
                disabled={!uploadedImage || loading}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {loading ? (
                  <span className="inline-flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </span>
                ) : 'Get Recommendations'}
              </button>
              <button
                onClick={() => onAddToCart?.({ ...measurements, fitRating })}
                disabled={!uploadedImage}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}

        {/* Right Panel - Recommendations */}
        {activeTab === 'recommendations' && (
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-4">Recommended For You</h3>
            {recommendations.length > 0 ? (
              <ul className="space-y-4">
                {recommendations.map((item) => (
                  <li key={item.id} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex gap-4">
                      <img src={item.image} alt="" className="w-16 h-16 object-cover rounded" />
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        <p className="text-xs mt-1 text-blue-600">{item.reason}</p>
                        <button
                          onClick={() => onAddToCart?.(item)}
                          className="mt-2 text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded hover:bg-blue-100"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No recommendations yet. Try adjusting your measurements.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

TryOnViewer.propTypes = {
  productImage: PropTypes.string.isRequired,
  mockupImage: PropTypes.string.isRequired,
  onAddToCart: PropTypes.func,
  onRecommend: PropTypes.func,
};

export default memo(TryOnViewer);