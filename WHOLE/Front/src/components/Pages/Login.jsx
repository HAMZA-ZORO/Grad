import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from '../../api/config';
import "./login-register.css"

export function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        switch (data.level) {
          case 1:
            navigate("/Awareness");
            break;
          case 2:
            navigate("/Training");
            break;
          case 3:
            navigate("/Education");
            break;
          default:
            navigate("/Home");
        }
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
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
            <h2 className="text-center mb-4">Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
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
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <div className="d-grid mb-3">
                <button type="submit" className="btn btn-primary">
                  Log in
                </button>
              </div>

              <div className="text-center">
                <span>Create New Account </span>
                <Link to="/register" className="text-decoration-none">
                  Create
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}