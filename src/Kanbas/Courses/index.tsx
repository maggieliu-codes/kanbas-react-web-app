import { courses } from "../Database";
import { Navigate, Route, Routes, useParams, useLocation, Link } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import { FaGlasses } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import Modules from "./Modules ";
import "./index.css";

function Courses() {
  const { courseId } = useParams();
  const location = useLocation();
  const course = courses.find((course) => course._id === courseId);

  const pathSegments = location.pathname.split('/').filter(segment => segment).slice(3);

  return (
    <div>
        <div className="d-flex justify-content-between align-items-center top-bar">
        <HiMiniBars3 style={{ color: 'red' }} />
        <nav aria-label="breadcrumb" className="flex-grow-1 custom-breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">{course?.name}</Link>
            </li>
            {pathSegments.map((segment, index) => (
              <li key={index} className={`breadcrumb-item ${index === pathSegments.length - 1 ? 'active' : ''}`} aria-current={index === pathSegments.length - 1 ? 'page' : undefined}>
                {index === pathSegments.length - 1 ? segment : <Link to={`/${segment}`}>{segment}</Link>}
              </li>
            ))}
          </ol>
        </nav>
        <div className="d-flex align-items-center">
            <button className="btn btn-light">
            <FaGlasses />Student View
            </button>
        </div>
      </div>
      <hr/>
      <CourseNavigation />
      <div>
        <div
          className="overflow-y-scroll position-fixed bottom-0 end-0"
          style={{ left: "320px", top: "50px" }} >
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<h1>Home</h1>} />
            <Route path="Modules" element={<Modules/>} />
            <Route path="Piazza" element={<h1>Piazza</h1>} />
            <Route path="Assignments" element={<h1>Assignments</h1>} />
            <Route path="Assignments/:assignmentId" element={<h1>Assignment Editor</h1>} />
            <Route path="Grades" element={<h1>Grades</h1>} />
          </Routes>
        </div>
      </div>

    </div>
  );
}
export default Courses;