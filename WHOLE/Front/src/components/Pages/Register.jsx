import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from '../../api/config';
import "./login-register.css"

export function Register() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setError(""); // Clear previous errors
    
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          password: formData.get("password"),
          level: parseInt(formData.get("level")),
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        switch (parseInt(formData.get("level"))) {
          case 1:
            navigate("/Awareness");
            break;
          case 2:
            navigate("/Training");
            break;
          case 3:
            navigate("/education");
            break;
          default:
            navigate("/Home");
        }
      } else {
        if (data.errors && data.errors.length > 0) {
          setError(data.errors[0].msg);
        } else {
          setError(data.message || "Registration failed");
        }
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column login-register">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold ms-4" to="/">
            CyberWare
          </Link>
          <button
            className="btn btn-outline-light me-4"
            onClick={() => navigate("/")}
          >
            Home
          </button>
        </div>
      </nav>

      <div className="container flex-grow-1 d-flex align-items-center justify-content-center py-5">
        <div
          className="card shadow-lg"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          <div className="card-body p-4">
            <h2 className="text-center mb-4">Registration</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-person"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Create password (min 8 chars, include number & special char)"
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <select className="form-select" name="level" required>
                  <option value="" disabled selected>
                    Choose your level
                  </option>
                  <option value="1">I know nothing in Tech or Security</option>
                  <option value="2">
                    I know a little bit and I want to protect Myself
                  </option>
                  <option value="3">I am Learning Secure Coding</option>
                </select>
              </div>

              <div className="d-grid mb-3">
                <button type="submit" className="btn btn-primary">
                  Register Now
                </button>
              </div>

              <div className="text-center">
                <span>Already have an account? </span>
                <Link to="/login" className="text-decoration-none">
                  Login now
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}