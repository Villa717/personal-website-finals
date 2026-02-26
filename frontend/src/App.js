import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  
  // Replace this with your actual Codespace Backend URL
 const API_URL = "https://personal-website-finals-wheat.vercel.app/guestbook";

  // Requirement: GET method to fetch data
  const fetchEntries = async () => {
    try {
      const response = await axios.get(API_URL);
      setEntries(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  // Requirement: POST method to send data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !message) return alert("Please fill in both fields");

    try {
      await axios.post(API_URL, { name, message });
      setName('');
      setMessage('');
      fetchEntries(); // Refresh the list
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Andrei Antonio's Profile</h1>
        <p>Fullstack Developer | WebProg Final Project</p>
      </header>

      <main className="main-content">
        <section className="form-section">
          <h2>Leave a Message</h2>
          <form onSubmit={handleSubmit} className="guestbook-form">
            <input 
              type="text" 
              placeholder="Your Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
            <textarea 
              placeholder="Your Message" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button type="submit">Send Message</button>
          </form>
        </section>

        <section className="list-section">
          <h2>Guestbook Entries</h2>
          <div className="entries-grid">
            {entries.map((entry) => (
              <div key={entry.id} className="entry-card">
                <strong>{entry.name}</strong>
                <p>{entry.message}</p>
                <small>{new Date(entry.created_at).toLocaleDateString()}</small>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
