import { useState } from "react";
import "./App.css";
import WeatherApp from "./weather/WeatherApp";
import TodoApp from "./todo/TodoApp";

function App() {
  const [showWeather, setShowWeather] = useState(false);
  const [showTodo, setShowTodo] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);

  // Weather App
  if (showWeather) {
    return (
      <div>
       <button
  className="back-button"
  onClick={() => setShowWeather(false)}
>
  ← Back to Portfolio
</button>

        <WeatherApp />
      </div>
    );
  }

  // Todo App
  if (showTodo) {
    return (
      <div>
        <button
  className="back-button"
  onClick={() => setShowTodo(false)}
>
  ← Back to Portfolio
</button>

        <TodoApp />
      </div>
    );
  }

  // Portfolio Project Details
  if (showPortfolio) {
    return (
      <div className="portfolio-details-page">
        <button
          onClick={() => setShowPortfolio(false)}
          className="back-button"
        >
          ← Back to Portfolio
        </button>

        <div className="portfolio-details-card">
          <p className="details-label">MY PROJECT</p>

          <h1>Portfolio Website</h1>

          <p className="details-intro">
            A modern personal portfolio website designed to showcase my
            skills, projects and journey as a future web developer.
          </p>

          <div className="details-section">
            <h2>What I Built</h2>

            <p>
              I created this portfolio using React and modern CSS.
              The website has a responsive layout, smooth navigation,
              interactive project cards and a dark purple visual theme.
            </p>
          </div>

          <div className="details-section">
            <h2>Technologies</h2>

            <div className="tech-list">
              <span>React</span>
              <span>JavaScript</span>
              <span>CSS</span>
              <span>Vite</span>
            </div>
          </div>

          <div className="details-section">
            <h2>Features</h2>

            <ul className="feature-list">
              <li>Responsive design</li>
              <li>Glass-effect navigation</li>
              <li>Purple gradient theme</li>
              <li>Interactive project section</li>
              <li>Working Weather and Todo projects</li>
            </ul>
          </div>

          <div className="details-highlight">
            <span>🚀</span>
            <p>
              This portfolio is continuously being improved as I learn
              more about web development.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Falak</div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="hero">
        <div className="hero-content">
          <p className="small-text">HELLO, I'M</p>

          <h1>Falak Naaz</h1>

          <h2>Future Web Developer 🚀</h2>

          <p className="hero-description">
            I create clean, modern and user-friendly websites while
            continuously learning and improving my skills.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="projects">
        <div className="section-heading">
          <p>MY WORK</p>
          <h2>Featured Projects</h2>
        </div>

        <div className="project-grid">

          {/* Portfolio */}
          <div className="project-card">
            <span>01</span>

            <h3>Portfolio Website</h3>

            <p>
              A modern and responsive personal portfolio built with React.
            </p>

            <button onClick={() => setShowPortfolio(true)}>
              View Project ↗
            </button>
          </div>

          {/* Todo */}
          <div className="project-card">
            <span>02</span>

            <h3>Todo App</h3>

            <p>
              A simple and clean todo application for managing daily tasks.
            </p>

            <button onClick={() => setShowTodo(true)}>
              View Project ↗
            </button>
          </div>

          {/* Weather */}
          <div className="project-card">
            <span>03</span>

            <h3>Weather App</h3>

            <p>
              Search any city and check its current weather conditions.
            </p>

            <button onClick={() => setShowWeather(true)}>
              View Project ↗
            </button>
          </div>

        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact">
        <p>LET'S CONNECT</p>

        <h2>Have a project in mind?</h2>

        <a
          href="https://t.me/falaknaaz1234"
          target="_blank"
          rel="noreferrer"
          className="contact-link"
        >
          Contact Me ↗
        </a>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2026 Falak Naaz. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default App;