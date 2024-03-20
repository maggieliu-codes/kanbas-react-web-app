import React from "react";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle, FaCaretDown } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { assignments } from "../../Database";
import "./index.css";
function Assignments() {
  const { courseId } = useParams();
  const assignmentList = assignments.filter(
    (assignment) => assignment.course === courseId);
  return (
    <>
    <div className="d-flex justify-content-between align-items-center">
  <input
    type="text"
    className="form-control w-25 search-input"
    placeholder="Search for Assignment"
  />
  <div className="d-flex align-items-center">
    <button className="btn btn-light">+ Group</button>
    <button className="btn btn-danger">+ Assignment</button>
    <button className="btn btn-light"><FaEllipsisV className="ms-2" /></button>
  </div>
</div>

<hr />

      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <div>
            <FaEllipsisV className="me-2" /><FaCaretDown className="me-2"/> ASSIGNMENTS
            <span className="float-end">
            <div className="percentage-badge bg-light rounded-pill">40% of Total</div>
              <FaCheckCircle className="text-success" />
              <FaPlusCircle className="ms-2" /><FaEllipsisV className="ms-2" />
            </span>
          </div>
          <ul className="list-group">
            {assignmentList.map((assignment) => (
              <li className="list-group-item assignment">
                <FaEllipsisV className="me-2" /><FaPenToSquare className="pen_icon me-2"/>
                <Link
                   to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>{assignment.title}</Link>
                <span className="float-end">
                  <FaCheckCircle className="text-success" /><FaEllipsisV className="ms-2" /></span>
              </li>))}
          </ul>
        </li>
      </ul>
    </>
);}
export default Assignments;