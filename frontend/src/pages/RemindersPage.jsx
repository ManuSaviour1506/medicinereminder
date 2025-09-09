// frontend/src/pages/RemindersPage.jsx
import React, { useState, useEffect } from 'react';

const RemindersPage = ({ user, token }) => {
  const [reminders, setReminders] = useState([]);
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [nextDoseTime, setNextDoseTime] = useState('');

  useEffect(() => {
    if (token) {
      fetchReminders();
    }
  }, [token]);

  const fetchReminders = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/reminders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setReminders(data);
      } else {
        console.error('Failed to fetch reminders');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateReminder = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/reminders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ medicineName, dosage, frequency, nextDoseTime }),
      });
      if (response.ok) {
        const newReminder = await response.json();
        setReminders([...reminders, newReminder]);
        setMedicineName('');
        setDosage('');
        setFrequency('');
        setNextDoseTime('');
      } else {
        alert('Failed to create reminder.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteReminder = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/reminders/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        setReminders(reminders.filter(reminder => reminder._id !== id));
      } else {
        alert('Failed to delete reminder.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Your Reminders</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Add a New Medicine Reminder</h3>
        <form onSubmit={handleCreateReminder}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Medicine Name"
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Dosage (e.g., 1 pill)"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Frequency (e.g., Every 8 hours)"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <input
              type="datetime-local"
              value={nextDoseTime}
              onChange={(e) => setNextDoseTime(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Set Reminder
          </button>
        </form>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Upcoming Reminders</h3>
        {reminders.length === 0 ? (
          <p>You have no active reminders. Add one above!</p>
        ) : (
          <ul className="space-y-4">
            {reminders.map((reminder) => (
              <li key={reminder._id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border">
                <div>
                  <h3 className="text-lg font-bold">{reminder.medicineName}</h3>
                  <p className="text-gray-600">Dosage: {reminder.dosage}</p>
                  <p className="text-gray-600">Frequency: {reminder.frequency}</p>
                  <p className="text-sm text-gray-400">Next Dose: {new Date(reminder.nextDoseTime).toLocaleString()}</p>
                </div>
                <button
                  onClick={() => handleDeleteReminder(reminder._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors text-sm"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RemindersPage;