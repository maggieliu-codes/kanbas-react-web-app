import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/reducer";
import assignmentsReducer from "../Courses/Assignments/assignmentsReducer"; // Adjust the import path as necessary

export interface KanbasState {
  modulesReducer: {
    modules: any[]; // Consider defining a more specific type for modules
    module: any;    // and module, rather than using 'any'
  };
}

export interface AssignmentState {
    assignmentsReducer: {
        assignments: any[]; // Similarly, consider defining a more specific type for assignments
        assignment: any;    // and assignment
      };
}

const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentsReducer // Add the assignmentsReducer to the store
  }
});

export default store;
