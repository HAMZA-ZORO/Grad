import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { useEffect } from "react";
import $ from "jquery";
import { Education } from "./Pages/Education";

export const Navbar = () => {
  useEffect(() => {
    // jQuery to add 'active' class to clicked nav-link
    $(".nav-link").on("click", function () {
      // Remove active class from all nav-links
      $(".nav-link").removeClass("active");

      // Add active class to the clicked link
      $(this).addClass("active");
    });
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ps-3 pe-3 ">
      <NavLink className="navbar-brand" to="home">
        Securify
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item p-2">
            <Link className="nav-link " to="home">
              Home
            </Link>
          </li>
          <li className="nav-item p-2">
            <Link className="nav-link " to="awareness">
              Awareness
            </Link>
          </li>
          <li className="nav-item p-2">
            <Link className="nav-link" to="education">
              Education
            </Link>
          </li>
          <li className="nav-item p-2">
            <Link className="nav-link" to="trivia-quiz">
              Trivia-Quiz
            </Link>
          </li>
          <li className="nav-item p-2">
            <Link className="nav-link" to="login">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
