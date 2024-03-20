import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { assignments } from "../../../Database";
import { FaEllipsisV} from "react-icons/fa";
import "./index.css";
function AssignmentEditor() {
  const { assignmentId } = useParams();
  const assignment = assignments.find(
    (assignment) => assignment._id === assignmentId);
  const { courseId } = useParams();
  const navigate = useNavigate();
  const handleSave = () => {
    console.log("Actually saving assignment TBD in later assignments");
    navigate(`/Kanbas/Courses/${courseId}/Assignments`);
  };
  return (
    <div>
      <div className="container mt-5">
      <form>
        <div className="d-flex justify-content-between align-items-center">
          <div></div>
          <div className="d-flex align-items-center">
            <span className="published"
              ><i className="fa-regular fa-square-check"></i> Published
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
              placeholder={assignment?.title}
            />
          </div>
        </div>

        <div className="form-group row mt-3">
          <div className="col-sm-12">
          <textarea
            className="form-control"
            rows={4}
            placeholder="This is assignment description placeholder."
            />
          </div>
        </div>

        <div className="form-group row mt-3">
        <label htmlFor="points" className="col-sm-2 col-form-label text-end">Points</label>

          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              id="points"
              placeholder="100"
            />
          </div>
        </div>

        <div className="form-group row mt-3">
          <label htmlFor="assignmentGroup" className="col-sm-2 col-form-label text-end"
            >Assignment Group</label>
          <div className="col-sm-10">
            <select className="form-control" id="assignmentGroup">
              <option>ASSIGNMENTS</option>
            </select>
          </div>
        </div>

        <div className="form-group row mt-3">
          <label htmlFor="displayGrade" className="col-sm-2 col-form-label text-end"
            >Display Grade as</label >
          <div className="col-sm-10">
            <select className="form-control" id="displayGrade">
              <option>Percentage</option>
            </select>
          </div>
        </div>

        <div className="form-group row mt-3 final-grade-checkbox">
          <div className="col-sm-10">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="noCount" />
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
                    type="text"
                    className="form-control"
                    placeholder="Sep 18, 2023, 11:59 PM"
                  />
                </div>

                <div className="row mb-3">
                  <div className="col-6">
                    <div className="text-muted">Available from</div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Sep 6, 2023, 12:00 PM"
                    />
                  </div>
                  <div className="col-6">
                    <div className="text-muted">Until</div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Sep 18, 2023, 11:59 PM"
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
            <Link to={`/Kanbas/Courses/${courseId}/Assignments`}
 className="btn btn-light">Cancel</Link>
            <button onClick={handleSave} className="btn btn-danger">Save</button>
          </div>
        </div>
      </form>
    </div>
    </div>
  );
}
export default AssignmentEditor;