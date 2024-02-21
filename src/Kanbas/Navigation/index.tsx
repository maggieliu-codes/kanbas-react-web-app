import { Link, useLocation } from "react-router-dom";
import "./index.css"; // Adjust the path as necessary to point to your CSS file
import { 
  FaUserCircle, FaTachometerAlt, FaBook, FaCalendar, FaInbox, 
  FaHistory, FaYoutube, FaArrowRight, FaQuestion 
} from "react-icons/fa";

function KanbasNavigation() {
  const links = [
    { label: "Account",   icon: <FaUserCircle className="fs-2 user-icon" /> },
    { label: "Dashboard", icon: <FaTachometerAlt className="fs-2" /> },
    { label: "Courses",   icon: <FaBook className="fs-2" /> },
    { label: "Calendar",  icon: <FaCalendar className="fs-2" /> },
    { label: "Inbox",     icon: <FaInbox className="fs-2" /> },
    { label: "History",   icon: <FaHistory className="fs-2" /> },
    { label: "Studio",    icon: <FaYoutube className="fs-2" /> },
    { label: "Commons",   icon: <FaArrowRight className="fs-2" /> },
    { label: "Help",      icon: <FaQuestion className="fs-2" /> },
  ];

  const { pathname } = useLocation();

  return (
    <ul className="wd-kanbas-navigation">
      {links.map((link, index) => (
        <li key={index} className={pathname.includes(link.label) ? "wd-active" : ""}>
          <Link to={`/Kanbas/${link.label.replace(/\s+/g, '')}`}>
            {link.icon} {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default KanbasNavigation;
