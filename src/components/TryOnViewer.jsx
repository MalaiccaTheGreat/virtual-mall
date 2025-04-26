import React, { useState } from 'react';

export default function TryOnViewer({ productImage, mockupImage }) {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [measurements, setMeasurements] = useState({
    height: 170, // Default height in cm
    chest: 90,   // Default chest size in cm
    waist: 70,   // Default waist size in cm
  });
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle image upload from the gallery
  const handleImageUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result) {
          setUploadedImage(reader.result);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  // Handle measurement input changes
  const handleMeasurementChange = (e) => {
    const { name, value } = e.target;
    setMeasurements((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fetch AI-based recommendations
  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://virtual-mall-api.onrender.com/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: uploadedImage,
          measurements,
        }),
      });

      const data = await response.json();
      setRecommendations(data.recommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="try-on-viewer">
      <h2 className="text-xl font-bold mb-4">Virtual Fitting Room</h2>
      <div className="viewer-container flex flex-col items-center gap-4">
        {/* Mockup and Product Overlay */}
        <div className="relative w-64 h-64 bg-gray-200 rounded-lg overflow-hidden">
          {/* Uploaded Image */}
          {uploadedImage ? (
            <img
              src={uploadedImage}
              alt="User"
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
          ) : (
            <p className="text-gray-500 text-center mt-24">Upload your image</p>
          )}

          {/* Mockup Image */}
          <img
            src={mockupImage}
            alt="Mockup"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          />

          {/* Product Image */}
          <img
            src={productImage}
            alt="Product"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            style={{
              transform: `scale(${measurements.height / 170})`, // Scale based on height
            }}
          />
        </div>

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />

        {/* Measurement Inputs */}
        <div className="flex flex-col gap-2 mt-4">
          <label>
            Height (cm):
            <input
              type="number"
              name="height"
              value={measurements.height}
              onChange={handleMeasurementChange}
              className="ml-2 px-2 py-1 border rounded"
            />
          </label>
          <label>
            Chest (cm):
            <input
              type="number"
              name="chest"
              value={measurements.chest}
              onChange={handleMeasurementChange}
              className="ml-2 px-2 py-1 border rounded"
            />
          </label>
          <label>
            Waist (cm):
            <input
              type="number"
              name="waist"
              value={measurements.waist}
              onChange={handleMeasurementChange}
              className="ml-2 px-2 py-1 border rounded"
            />
          </label>
        </div>

        {/* Fetch Recommendations Button */}
        <button
          onClick={fetchRecommendations}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {loading ? 'Loading...' : 'Get Recommendations'}
        </button>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="recommendations mt-4">
            <h3 className="text-lg font-bold mb-2">Recommended Products:</h3>
            <ul className="list-disc list-inside">
              {recommendations.map((item, index) => (
                <li key={index} className="text-gray-700">
                  {item.name} - {item.description}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}