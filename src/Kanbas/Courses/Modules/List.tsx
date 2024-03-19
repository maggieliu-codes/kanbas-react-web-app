import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addModule, deleteModule, updateModule, setModule } from "./reducer";
import { KanbasState } from "../../store";
import "./index.css";
import { modules } from "../../Database";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router";
function ModuleList() {
  interface Lesson {
    _id: string;
    name: string;
    description: string;
    module: string;
  }

  const { courseId } = useParams();
  const modulesList = useSelector(
    (state: KanbasState) => state.modulesReducer.modules
  );
  const module = useSelector(
    (state: KanbasState) => state.modulesReducer.module
  );
  const dispatch = useDispatch();

  const [selectedModule, setSelectedModule] = useState(modulesList[0]);
  return (
    <>
      <div className="d-flex align-items-center justify-content-end">
        <button className="btn btn-light">Collapse All</button>
        <button className="btn btn-light">View Progress</button>
        <select
          className="form-select"
          style={{ width: "150px", marginLeft: "10px", marginRight: "10px" }}
        >
          <option>✓ Publish All</option>
          <option>Unpublish All</option>
          <option>Archive All</option>
        </select>

        <button className="btn btn-danger">+ Module</button>
        <button className="btn btn-light">
          <FaEllipsisV className="me-2" />
        </button>
      </div>
      <hr />
      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <div className="form-group">
            <label htmlFor="moduleName">Module Name</label>
            <input
              type="text"
              className="form-control"
              id="moduleName"
              value={module.name}
              onChange={(e) =>
                dispatch(setModule({ ...module, name: e.target.value }))
              }
            />
          </div>
          <div className="form-group mt-3" id="no-top-margin">
            <label htmlFor="moduleDescription">Description</label>
            <textarea
              className="form-control"
              id="moduleDescription"
              value={module.description}
              onChange={(e) =>
                dispatch(setModule({ ...module, description: e.target.value }))
              }
            />
          </div>
          <div
            className="form-group mt-3 d-flex justify-content-end"
            id="no-top-margin-2"
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                dispatch(addModule({ ...module, course: courseId }))
              }
            >
              Add
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => dispatch(updateModule(module))}
            >
              Update
            </button>
          </div>
        </li>

        {modulesList
          .filter((module) => module.course === courseId)
          .map((module, index) => (
            <li
              key={index}
              className="list-group-item"
              onClick={() => dispatch(setModule(module))}
            >
              <div>
                <FaEllipsisV className="me-2" />
                {module.name}
                <span className="float-end">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => dispatch(deleteModule(module._id))}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={(event) => {
                      setModule(module);
                    }}
                  >
                    Edit
                  </button>

                  <FaCheckCircle className="text-success" />
                  <FaPlusCircle className="ms-2" />
                  <FaEllipsisV className="ms-2" />
                </span>
              </div>
              {selectedModule._id === module._id && (
                <ul className="list-group">
                  {module.lessons?.map((lesson: Lesson, index: number) => (
                    <li className="list-group-item" key={index}>
                      <FaEllipsisV className="me-2" />
                      {lesson.name}
                      <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        <FaEllipsisV className="ms-2" />
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </>
  );
}
export default ModuleList;
