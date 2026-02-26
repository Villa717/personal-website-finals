import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  
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

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchEntries(); 
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  return (
    <div className="portfolio-container" id="home">
      <nav className="navbar">
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#hobbies">Hobbies</a>
          <a href="#projects">Projects</a>
          <a href="#guestbook">Guestbook</a>
        </div>
        <div className="theme-toggle">☀️</div>
      </nav>

      <section className="hero">
        <div className="photo-wrapper">
          <img src="/my-profile.jpg" alt="Andrei Antonio" className="profile-pic" />
        </div>
        <div className="hero-content">
          <h1>Andrei Antonio G. Villa</h1>
          <p className="subtitle">Computer Science Student | Asia Pacific College</p>
          <p className="bio-intro">
            I am a second-year student specializing in Cybersecurity and Forensics. 
            I am currently studying about web development, IoT systems, and building clean, functional digital experiences.
          </p>
          
          <div className="social-icons">
            <a href="https://www.facebook.com/andrei.villa.39" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://www.linkedin.com/in/andrei-villa-b77513321/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com/adnrzzz/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://github.com/Villa717" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="mailto:andreivilla374@gmail.com">Email</a>
          </div>
        </div>
      </section>

      {/* Main Info Grid - 3 Separate Boxes */}
      <div className="info-grid">
        <div className="card" id="about">
          <h3>Academic Profile</h3>
          <p><strong>School:</strong> Asia Pacific College</p>
          <p><strong>Course:</strong> BSCS-SF</p>
          <p><strong>Section:</strong> SF241</p>
          <p><strong>Year Level:</strong> 2nd Year Student</p>
          <p><strong>Focus:</strong> Cybersecurity & Forensics</p>
        </div>

        <div className="card" id="skills">
          <h3>Skills</h3>
          <div className="pill-container">
            <span className="pill">Mysql</span>
            <span className="pill">Javascript</span>
            <span className="pill">Supabase</span>
            <span className="pill">Arduino</span>
            <span className="pill">MariaDB</span>
            <span className="pill">Ubuntu</span>
            <span className="pill">Kali Linux</span>
            <span className="pill">Java</span>
            <span className="pill">Python</span>
          </div>
        </div>

        <div className="card" id="hobbies">
          <h3>Hobbies</h3>
          <p>Passionate about exploring Physics and hardware. I also enjoy:</p>
          <div className="pill-container">
            <span className="pill">Running</span>
            <span className="pill">Cycling</span>
            <span className="pill">Watching movies</span>
            <span className="pill">Anime/manga</span>
            <span className="pill">Videogames</span>
            <span className="pill">Web designing</span>
          </div>
        </div>
      </div>

      <section id="projects" className="projects-container">
        <h2 className="section-title">Technical Projects</h2>
        <div className="info-grid">
          <div className="card">
            <h3>Smart Plant Watering System</h3>
            <p>An IoT system designed using Arduino and ESP32 to monitor soil moisture and automate watering.</p>
            <div className="pill-container">
              <span className="pill">Arduino</span>
              <span className="pill">IoT</span>
              <span className="pill">Sensors</span>
            </div>
          </div>

          <div className="card">
            <h3>React Guestbook</h3>
            <p>A full-stack guestbook application built with React, Nest.js, and Supabase.</p>
            <div className="pill-container">
              <span className="pill">React</span>
              <span className="pill">Nest.js</span>
              <span className="pill">Supabase</span>
            </div>
          </div>
        </div>
      </section>

      <main className="guestbook-section" id="guestbook">
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
                  <button className="delete-btn" onClick={() => handleDelete(entry.id)}>×</button>
                </div>
                <p>{entry.message}</p>
                <small>{new Date(entry.created_at).toLocaleDateString()}</small>
              </div>
            ))}
          </div>
        </section>
      </main>

{/* GUESTBOOK SECTION ENDS HERE */}
      
      <footer className="footer">
        <p className="copyright">© 2026 Andrei Antonio G. Villa</p>
        <p className="build-info">Built with React & Supabase</p>
      </footer>
    </div> // This is the closing tag for portfolio-container
  );
}

export default App;

   