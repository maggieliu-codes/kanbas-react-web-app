import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "../assignmentsReducer";
import * as client from "../client";
import { FaEllipsisV } from "react-icons/fa";
import { AssignmentState } from "../../../store";
import "./index.css";
import { create } from "domain";
function AssignmentEditor() {
  const { courseId, assignmentId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isNewAssignment = assignmentId === "new";
  const defaultAssignment = useSelector(
    (state: AssignmentState) => state.assignmentsReducer.assignment
  );
  const assignments = useSelector(
    (state: AssignmentState) => state.assignmentsReducer.assignments
  );

  const [localAssignment, setLocalAssignment] = useState({
    ...defaultAssignment,
    course: courseId,
  });

  useEffect(() => {
    const assignmentToEdit = isNewAssignment
      ? { ...defaultAssignment, course: courseId }
      : assignments.find((a) => a._id === assignmentId);

    if (assignmentToEdit) {
      setLocalAssignment(assignmentToEdit);
    }
  }, [assignmentId, assignments, courseId, defaultAssignment, isNewAssignment]);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setLocalAssignment((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (isNewAssignment) {
      client.createAssignment(courseId, localAssignment).then((assignment) => {
        dispatch(addAssignment(assignment));
      });
    } else {
      handleUpdateModule();
    }
    navigate(`/Kanbas/Courses/${courseId}/Assignments`);
  };

  const handleUpdateModule = async () => {
    const response = await client.updateAssignment(localAssignment);
    dispatch(updateAssignment({ ...localAssignment, _id: assignmentId }));
  };

  return (
    <div className="container mt-5">
      <form>
        <div className="d-flex justify-content-between align-items-center">
          <div></div>
          <div className="d-flex align-items-center">
            <span className="published">
              <i className="fa-regular fa-square-check"></i> Published
            </span>
            <button className="btn btn-light">
              <FaEllipsisV className="ms-2" />
            </button>
          </div>
        </div>
        <hr />
        <div>Assignment Name</div>
        <div className="form-group row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              id="assignmentName"
              name="title" // Ensure the name matches the property in your assignment object
              value={localAssignment.title || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group row mt-3">
          <div className="col-sm-12">
            <textarea
              className="form-control"
              rows={4}
              name="description"
              value={localAssignment.description || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group row mt-3">
          <label htmlFor="points" className="col-sm-2 col-form-label text-end">
            Points
          </label>

          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              id="points"
              name="points" // Added name attribute
              value={localAssignment.points || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group row mt-3">
          <label
            htmlFor="assignmentGroup"
            className="col-sm-2 col-form-label text-end"
          >
            Assignment Group
          </label>
          <div className="col-sm-10">
            <select className="form-control" id="assignmentGroup">
              <option>ASSIGNMENTS</option>
            </select>
          </div>
        </div>

        <div className="form-group row mt-3">
          <label
            htmlFor="displayGrade"
            className="col-sm-2 col-form-label text-end"
          >
            Display Grade as
          </label>
          <div className="col-sm-10">
            <select className="form-control" id="displayGrade">
              <option>Percentage</option>
            </select>
          </div>
        </div>

        <div className="form-group row mt-3 final-grade-checkbox">
          <div className="col-sm-10">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="noCount"
              />
              <label className="form-check-label" htmlFor="noCount">
                Do not count this assignment towards the final grade
              </label>
            </div>
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-2 col-form-label text-end">Assign</div>
          <div className="col-sm-10 assign-box">
            <div className="container mt-3 rounded-3">
              <div className="form-section">
                <div className="mb-3">
                  <div className="text-muted">Assign to</div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Everyone"
                  />
                </div>

                <div className="mb-3">
                  <div className="text-muted">Due</div>
                  <input
                    type="date"
                    className="form-control"
                    value={localAssignment.dueDate || ""}
                    name="dueDate" // Added name attribute
                    onChange={handleInputChange}
                  />
                </div>

                <div className="row mb-3">
                  <div className="col-6">
                    <div className="text-muted">Available from</div>
                    <input
                      type="date"
                      className="form-control"
                      value={localAssignment.availableFromDate || ""}
                      name="availableFromDate" // Added name attribute
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-6">
                    <div className="text-muted">Until</div>
                    <input
                      type="date"
                      className="form-control"
                      value={localAssignment.availableUntilDate || ""}
                      name="availableUntilDate" // Added name attribute
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="add-row">+ Add</div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <input
              className="form-check-input"
              type="checkbox"
              id="contentChange"
            />
            <label className="form-check-label" htmlFor="contentChange">
              Notify users the content has changed.
            </label>
          </div>
          <div className="d-flex align-items-center">
            <Link
              to={`/Kanbas/Courses/${courseId}/Assignments`}
              className="btn btn-light"
            >
              Cancel
            </Link>
            <button onClick={handleSave} className="btn btn-danger">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default AssignmentEditor;
