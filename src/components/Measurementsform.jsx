// Create src/components/MeasurementForm.jsx
import { useState } from 'react';

export default function MeasurementForm({ onSubmit }) {
  const [measurements, setMeasurements] = useState({
    height: '',
    waist: ''
  });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit({
        measurements: {
          height: Number(measurements.height),
          waist: Number(measurements.waist)
        },
        stylePreferences: "casual"
      });
    }}>
      <input
        type="number"
        placeholder="Height (cm)"
        value={measurements.height}
        onChange={(e) => setMeasurements({...measurements, height: e.target.value})}
      />
      <button type="submit">Save Measurements</button>
    </form>
  );
}