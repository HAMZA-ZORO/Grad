import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Pages/Home";
import { Awareness } from "./components/Pages/Awareness";
import { Education } from "./components/Pages/Education";
import { Login } from "./components/Pages/Login";
import { PageNotFound } from "./components/Pages/PageNotFound";
import Questions from "./components/Questions";
import { Register } from "./components/Pages/Register";
import { Welcome } from "./components/Pages/Welcome";
export function App() {
  return (
    <div className="App">
      {/* <CybersecurityAwarenessPage></CybersecurityAwarenessPage> */}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/awareness" element={<Awareness />} />
        <Route path="/education" element={<Education />} />
        <Route path="/trivia-quiz" element={<Questions />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
