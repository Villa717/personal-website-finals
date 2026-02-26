import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  
  // Requirement: Live Vercel Backend URL
  const API_URL = "https://personal-website-finals-wheat.vercel.app/guestbook";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !message) return alert("Please fill in both fields");

    try {
      await axios.post(API_URL, { name, message });
      setName('');
      setMessage('');
      fetchEntries(); 
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  // New: Function to delete an entry
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchEntries(); // Refresh the list
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  return (
    <div className="portfolio-container">
      <nav className="navbar">
        <div className="nav-links">
          <span>Home</span>
          <span>About</span>
          <span>Projects</span>
          <span>Guestbook</span>
        </div>
        <div className="theme-toggle">☀️</div>
      </nav>

      <section className="hero">
        <div className="photo-wrapper">
          <img src="/my-profile.jpg" alt="Andrei Antonio" className="profile-pic" />
        </div>
        <div className="hero-content">
          <h1>Andrei Antonio</h1>
          <p className="subtitle">Computer Science Student | Asia Pacific College</p>
          <p className="bio-intro">
            I am a second-year student specializing in **Cybersecurity and Forensics**. 
            I am passionate about web development, IoT systems, and building clean, functional digital experiences.
          </p>
          <div className="social-icons">
             <span>Facebook</span> | <span>LinkedIn</span> | <span>Instagram</span> | <span>Email</span>
          </div>
        </div>
      </section>

      <div className="info-grid">
        <div className="card">
          <h3>Skills & Technology</h3>
          <div className="pill-container">
            <span className="pill">React</span>
            <span className="pill">Nest.js</span>
            <span className="pill">Supabase</span>
            <span className="pill">Cybersecurity</span>
            <span className="pill">Arduino</span>
            <span className="pill">IoT</span>
          </div>
        </div>

        <div className="card">
          <h3>Academic Profile</h3>
          <p><strong>School:</strong> Asia Pacific College</p>
          <p><strong>Course:</strong> BS Computer Science</p>
          <p><strong>Year Level:</strong> 2nd Year Student</p>
          <p><strong>Age:</strong> 20</p>
          <p><strong>Interests:</strong> Hardware configuration, Web Dev, Physics</p>
        </div>
      </div>

      <main className="guestbook-section">
        <section className="form-section">
          <h2>Leave a Message</h2>
          <form onSubmit={handleSubmit} className="guestbook-form">
            <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
            <textarea placeholder="Your Message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
            <button type="submit">Send Message</button>
          </form>
        </section>

        <section className="list-section">
          <h2>Guestbook Entries</h2>
          <div className="entries-grid">
            {entries.map((entry) => (
              <div key={entry.id} className="entry-card">
                <div className="entry-header">
                  <strong>{entry.name}</strong>
                  {/* Delete Button */}
                  <button className="delete-btn" onClick={() => handleDelete(entry.id)}>×</button>
                </div>
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