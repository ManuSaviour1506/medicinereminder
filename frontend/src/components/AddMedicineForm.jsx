// frontend/src/components/AddMedicineForm.jsx
import React, { useState } from 'react';
import axios from 'axios'; // We'll use Axios for cleaner API calls. npm install axios

function AddMedicineForm() {
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    frequency: '',
    stockCount: '',
    critical: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/medicines', formData);
      console.log('Medicine added successfully:', response.data);
      alert('Medicine added successfully!');
      // Reset form or redirect
    } catch (error) {
      console.error('Error adding medicine:', error.response ? error.response.data : error.message);
      alert('Failed to add medicine.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
      {/* Input fields for name, dosage, frequency, stockCount, critical */}
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Medicine Name" />
      <input type="text" name="dosage" value={formData.dosage} onChange={handleChange} placeholder="Dosage" />
      {/* ... other inputs */}
      <button type="submit">Add Medicine</button>
    </form>
  );
}

export default AddMedicineForm;