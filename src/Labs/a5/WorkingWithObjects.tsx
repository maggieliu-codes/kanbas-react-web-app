import React, { useEffect, useState } from "react";
import axios from "axios";
function WorkingWithObjects() {
  // assignment state variable
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });
  // module state variable
  const [module, setModule] = useState({
    id: 1,
    name: "NodeJS",
    description: "NodeJS module",
    course: "Web Development",
  });

  const API_BASE = process.env.REACT_APP_API_BASE;

  const ASSIGNMENT_URL = `${API_BASE}/a5/assignment`;
  const fetchAssignment = async () => {
    const response = await axios.get(`${ASSIGNMENT_URL}`);
    setAssignment(response.data);
  };
  const updateTitle = async () => {
    const response = await axios.get(
      `${ASSIGNMENT_URL}/title/${assignment.title}`
    );
    setAssignment(response.data);
  };
  useEffect(() => {
    fetchAssignment();
  }, []);

  const MODULE_URL = `${API_BASE}/a5/module`;
  return (
    <div>
      <h3>Working With Objects</h3>
      <h4>Modifying Properties</h4>
      <h5>3.4.4</h5>
      <input
        onChange={(e) =>
          setAssignment({
            ...assignment,
            title: e.target.value,
          })
        }
        value={assignment.title}
        type="text"
      />
      <button onClick={updateTitle}>Update Title to: {assignment.title}</button>
      <button onClick={fetchAssignment}>Fetch Assignment</button>
      {/* Update the assignment's title */}
      <br />
      <h5>3.2</h5>
      <a
        className="btn btn-primary"
        href={`${ASSIGNMENT_URL}/title/${assignment.title}`}
      >
        Update Title
      </a>
      <input
        type="text"
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
        value={assignment.title}
      />
      {/* Update the modules's name */}
      <a className="btn btn-primary" href={`${MODULE_URL}/name/${module.name}`}>
        Update Module Name
      </a>
      <input
        type="text"
        onChange={(e) => setModule({ ...module, name: e.target.value })}
        value={module.name}
      />
      {/* Update the assignment's score */}
      <h4>Update Score</h4>
      <input
        type="number"
        onChange={(e) =>
          setAssignment({ ...assignment, score: parseInt(e.target.value) })
        }
        value={assignment.score}
      />
      <a
        className="btn btn-primary"
        href={`${ASSIGNMENT_URL}/score/${assignment.score}`}
      >
        Update Score
      </a>
      {/* Update the assignment's completed status */}
      <h4>Update Completed Status</h4>
      <input
        type="checkbox"
        onChange={(e) =>
          setAssignment({ ...assignment, completed: e.target.checked })
        }
        checked={assignment.completed}
      />
      <a
        className="btn btn-primary"
        href={`${ASSIGNMENT_URL}/completed/${assignment.completed}`}
      >
        Update Completed Status
      </a>
      {/* Update module's description */}
      <h4>Update Module Description</h4>
      <input
        type="text"
        onChange={(e) => setModule({ ...module, description: e.target.value })}
        value={module.description}
      />
      <a
        className="btn btn-primary"
        href={`${MODULE_URL}/description/${module.description}`}
      >
        Update Description
      </a>

      <h4>Retrieving Objects</h4>
      <a className="btn btn-primary" href={`${API_BASE}/a5/assignment`}>
        Get Assignment
      </a>
      <a className="btn btn-primary" href={MODULE_URL}>
        Get Module
      </a>
      <h4>Retrieving Properties</h4>
      <a className="btn btn-primary" href={`${API_BASE}/a5/assignment/title`}>
        Get Title
      </a>
      <a className="btn btn-primary" href={`${MODULE_URL}/name`}>
        Get Module Name
      </a>
    </div>
  );
}
export default WorkingWithObjects;
