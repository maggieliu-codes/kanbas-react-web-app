import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
  setModules,
} from "./reducer";
import { KanbasState } from "../../store";
import "./index.css";
import * as client from "./client";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router";
import { modules } from "../../Database";
function ModuleList() {
  interface Lesson {
    _id: string;
    name: string;
    description: string;
    module: string;
  }

  interface Module {
    _id: string;
    name: string;
    description: string;
    course: string;
    lessons: Lesson[];
  }

  const { courseId } = useParams();
  useEffect(() => {
    client
      .findModulesForCourse(courseId || "")
      .then((modules) => dispatch(setModules(modules)));
  }, [courseId]);

  const modulesList = useSelector(
    (state: KanbasState) => state.modulesReducer.modules
  );

  const module = useSelector(
    (state: KanbasState) => state.modulesReducer.module
  );
  const dispatch = useDispatch();

  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  useEffect(() => {
    if (modulesList.length > 0) {
      setSelectedModule(modulesList[0]); // Set selectedModule once modulesList is populated
    }
  }, [modulesList]); // Depend on modulesList to re-run this effect

  const handleAddModule = () => {
    const newModule = {
      ...module, // Assuming 'module' contains the rest of the module data
      _id: new Date().getTime().toString(),
    };

    client.createModule(courseId, newModule).then((module) => {
      dispatch(addModule(module));
    });
  };

  const handleDeleteModule = (moduleId: string) => {
    client.deleteModule(moduleId).then((status) => {
      dispatch(deleteModule(moduleId));
    });
  };

  const handleUpdateModule = async () => {
    const status = await client.updateModule(module);
    dispatch(updateModule(module));
  };

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
              onClick={handleAddModule}
            >
              Add
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleUpdateModule}
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
              onClick={() => {
                dispatch(setModule(module)); // Dispatch action to set module
                setSelectedModule(module); // Set the clicked module as selectedModule
                console.log(selectedModule);
              }}
            >
              <div>
                <FaEllipsisV className="me-2" />
                {module.name}
                <span className="float-end">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDeleteModule(module._id)}
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

              {selectedModule && selectedModule._id === module?._id && (
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
