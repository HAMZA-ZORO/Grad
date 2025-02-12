import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Welcome.css";
export function Welcome() {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/login");
  };

  return (
    <div className="welcome d-flex flex-column  vh-100">
      <nav className="navbar navbar-expand navbar-dark bg-dark flex-shrink-0 ps-5 pe-5">
        <a className="navbar-brand me-auto" href="/">
          CyberWare
        </a>
        <div className="navbar-nav ms-auto">
          <li className="nav-item">
            <button
              className="btn btn-outline-light mt-1"
              onClick={handleSignInClick}
            >
              Sign In
            </button>
          </li>
        </div>
      </nav>

      {/* Hero Section with Background Image */}
      <header className="hero  text-white py-5 flex-shrink-0">
        <div className="container text-center">
          <h1 className="display-4">Reclaim Your Digital Space</h1>
          <p className="lead mt-3 fs-5">
            Master your digital footprint through cybersecurity awareness
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container my-5  flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <h2 className="mb-4">Our Services</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 shadow border-0">
                <div className="card-body">
                  <h5 className="card-title text-primary">
                    Security Awaireness
                  </h5>
                  <p className="card-text">
                    Learn to recognize digital patterns and understand what lies
                    beneath common online interactions
                  </p>
                </div>
              </div>
            </div>

            {/* Awareness Card 2 */}
            <div className="col-md-4">
              <div className="card h-100 shadow border-0">
                <div className="card-body">
                  <h5 className="card-title text-primary">
                    Secure Code Editor
                  </h5>
                  <p className="card-text">
                    Discover how everyday digital relationships work and how to
                    maintain safe boundaries
                  </p>
                </div>
              </div>
            </div>

            {/* Awareness Card 3 */}
            <div className="col-md-4">
              <div className="card h-100 shadow border-0">
                <div className="card-body">
                  <h5 className="card-title text-primary">Data Guardianship</h5>
                  <p className="card-text">
                    Understand your role in the digital ecosystem and how to
                    manage your informational presence
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Section with Background Image */}
      <footer className="footer bg-dark text-white py-4 mt-auto flex-shrink-0">
        <div className="container text-center">
          <p className="mb-2">
            Be aware, empower your digital world with responsibility
          </p>
          <p className="mb-0">&copy; 2025 FCAI Secure-Coding.</p>
        </div>
      </footer>
    </div>
  );
}
