import { FaBan, FaCheckCircle, FaFileImport, FaArrowAltCircleRight, FaBullseye, FaChartLine, FaBullhorn, FaBell, FaExclamationCircle, FaCalendar } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import "./index.css";

function Status() {
  return (
    <div>
      <h2>Course Status</h2>
<div className="btn-group" role="group" aria-label="Course Status Buttons">
  <button type="button" className="btn btn-outline-dark btn-custom-width">
  <FaBan /> Unpublish
  </button>
  <button type="button" className="btn btn-success btn-custom-width">
  <FaCheckCircle /> Published
  </button>
</div>
<ul className="list-group status-list-group">
  <li className="list-group-item">
    <a href="#!" className="top-tabs"
      ><FaFileImport /> Import Existing Content</a>
  </li>
  <li className="list-group-item">
    <a href="#!" className="top-tabs"
      ><FaArrowAltCircleRight /> Import From Commons</a>
  </li>
  <li className="list-group-item">
    <a href="#!" className="top-tabs"
      ><FaBullseye /> Choose Home Page</a>
  </li>
  <li className="list-group-item">
    <a href="#!" className="top-tabs"
      ><FaChartLine /> View Course Stream</a>
  </li>
  <li className="list-group-item">
    <a href="#!" className="top-tabs"
      ><FaBullhorn /> New Announcement</a>
  </li>
  <li className="list-group-item">
    <a href="#!" className="top-tabs"
      ><FaChartLine /> New Analytics</a>
  </li>
  <li className="list-group-item">
    <a href="#!" className="top-tabs"
      ><FaBell /> View Course Notifications</a>
  </li>
</ul>

<h2>To Do</h2>
<hr />
<ul className="list-group status-list-group">
  <li className="list-group-item">
  <FaExclamationCircle style={{ color: 'red' }} />
    <a href="#!" className="grade-text"
      >&nbsp;&nbsp;&nbsp;&nbsp;Grade A1 - ENV + HTML</a>
    <FaXmark className="fa-xmark"/>
  </li>
  <li className="date-text">100 points Sep 18 at 11:59pm</li>
</ul>

<h2>Coming Up <span className="view-calendar">View Calendar</span></h2>
<hr />
<ul className="list-group status-list-group">
  <li className="list-group-item">
  <FaCalendar />
    <a href="#!" className="grade-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lecture</a>
  </li>
  <li className="date-text">Lecture CS4550.12631.202410</li>
  <li className="date-text">Sep 11 at 11:45am</li>
  <li className="list-group-item">
  <FaCalendar />
    <a href="#!" className="grade-text"
      >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CSS610 06 SP23 Lecture</a >
  </li>
  <li className="date-text">Lecture CS4550.12631.202410</li>
  <li className="date-text">Sep 11 at 4pm</li>
  <li className="list-group-item">
  <FaCalendar />
    <a href="#!" className="grade-text"
      >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CSS610 Web Dev Summer 1
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2023 - LECTURE</a >
  </li>
  <li className="date-text">Lecture CS4550.12631.202410</li>
  <li className="date-text">Sep 11 at 7pm</li>
  <li className="list-group-item">
    <a href="#!" className="grade-text">12 more in the next week...</a>
  </li>
</ul>
    </div>
  );
}
export default Status;