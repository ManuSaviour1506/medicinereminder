// frontend/src/pages/CaretakerPage.jsx
import React, { useState } from 'react';

const CaretakerPage = ({ user, token }) => {
  const [caretakerEmail, setCaretakerEmail] = useState('');

  const handleLinkCaretaker = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/auth/link-caretaker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ caretakerEmail }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.msg);
        setCaretakerEmail('');
      } else {
        alert(data.msg);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to link caretaker.');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Caretaker</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Link a Caretaker</h3>
        <form onSubmit={handleLinkCaretaker}>
          <div className="flex gap-4">
            <input
              type="email"
              placeholder="Caretaker's Email"
              value={caretakerEmail}
              onChange={(e) => setCaretakerEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Link
            </button>
          </div>
        </form>
      </div>
      
      {/* This section will be for caretakers to see their patients */}
      {user?.isCaretaker && (
        <div>
          <h3 className="text-xl font-semibold mb-4">My Patients</h3>
          <p>This section is for a caretaker to view the patients they are linked to.</p>
        </div>
      )}
    </div>
  );
};

export default CaretakerPage;