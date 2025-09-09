// Corrected frontend/src/pages/MedicineList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        // We will get the token from localStorage to authenticate the request
        const token = localStorage.getItem('userToken'); 
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        // The GET request to your backend
        const response = await axios.get('/api/medicines', config); 
        setMedicines(response.data);
      } catch (err) {
        setError('Failed to fetch medicines. Please log in.');
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMedicines();
  }, []);

  // ... (rest of the component JSX) ...
};

export default MedicineList;