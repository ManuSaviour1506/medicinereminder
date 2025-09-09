// frontend/src/pages/AddMedicine.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AddMedicine = () => {
    // ... (rest of the component state and handlers) ...

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('userToken');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.post('/api/medicines', formData, config);
            console.log('Success:', response.data);
            alert('Medicine added successfully!');
            // You might want to update the MedicineList component here
        } catch (error) {
            console.error('Error adding medicine:', error);
            alert('Failed to add medicine. Check your console for details.');
        }
    };
    // ... (rest of the component JSX) ...
};

export default AddMedicine;