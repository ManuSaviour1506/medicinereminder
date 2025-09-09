// frontend/src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [reminders, setReminders] = useState([]);
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [nextDoseTime, setNextDoseTime] = useState('');
  const [caretakerEmail, setCaretakerEmail] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      fetchReminders();
    } else {
      navigate('/');
    }
  }, [navigate]);

  const fetchReminders = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/reminders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome, {user.username}!</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Add a New Medicine Reminder</h2>
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

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Link a Caretaker</h2>
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

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Your Reminders</h2>
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

export default Dashboard;