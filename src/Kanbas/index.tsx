import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Courses from "./Courses";
import Dashboard from "./Courses/Dashboard";
import "./styles.css";
function Kanbas() {
  return (
    <div className="row">
      <div className="col-md-2 col-lg-2 col-xl-1 col-xxl-1 d-none d-md-block"><KanbasNavigation /></div>
      <div className="col">
        <Routes>
          <Route path="/" element={<Navigate to="Dashboard" />} />
          <Route path="Account" element={<h1>Account</h1>} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="Courses/:courseId/*" element={<Courses />} />
        </Routes>
      </div>
    </div>
  );
}

export default Kanbas;