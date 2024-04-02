import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  setAssignment,
  setAssignments,
} from "../Assignments/assignmentsReducer";
import * as client from "./client";
import {
  FaCheckCircle,
  FaEllipsisV,
  FaPlusCircle,
  FaCaretDown,
  FaTrash,
} from "react-icons/fa";
import { AssignmentState } from "../../store";
import "./index.css";
import { FaPenToSquare } from "react-icons/fa6";

function Assignments() {
  const { courseId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    client
      .findAssignmentsForCourse(courseId || "")
      .then((assignments) => dispatch(setAssignments(assignments)));
  }, [courseId]);

  // get the list of assignments
  const assignmentList = useSelector(
    (state: AssignmentState) => state.assignmentsReducer.assignments
  );

  const handleDelete = (assignmentId: any) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to remove this assignment?"
    );
    if (isConfirmed) {
      client.deleteAssignment(assignmentId).then(() => {
        dispatch(deleteAssignment(assignmentId));
      });
    }
  };

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
          <Link to={`/Kanbas/Courses/${courseId}/Assignments/new`}>
            <button className="btn btn-danger">+ Assignment</button>
          </Link>
          <button className="btn btn-light">
            <FaEllipsisV className="ms-2" />
          </button>
        </div>
      </div>

      <hr />

      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <div>
            <FaEllipsisV className="me-2" />
            <FaCaretDown className="me-2" /> ASSIGNMENTS
            <span className="float-end">
              <div className="percentage-badge bg-light rounded-pill">
                40% of Total
              </div>
              <FaCheckCircle className="text-success" />
              <FaPlusCircle className="ms-2" />
              <FaEllipsisV className="ms-2" />
            </span>
          </div>
          <ul className="list-group">
            {assignmentList.map((assignment) => (
              <li key={assignment._id} className="list-group-item assignment">
                <FaEllipsisV className="me-2" />
                <FaPenToSquare className="pen_icon me-2" />
                <Link
                  to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  {assignment.title}
                </Link>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    Due {assignment.dueDate} | {assignment.points} pts
                  </div>
                  <span>
                    <FaCheckCircle className="text-success" />
                    <FaEllipsisV className="ms-2" />
                    <button
                      onClick={() => handleDelete(assignment._id)}
                      className="btn btn-danger btn-sm"
                    >
                      <FaTrash /> Delete
                    </button>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </>
  );
}

export default Assignments;
