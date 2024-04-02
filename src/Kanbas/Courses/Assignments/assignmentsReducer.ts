import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    assignments: [] as {_id: string; title: string; course: string; points: number; dueDate: string; availableFromDate: string; availableUntilDate: string}[],
    assignment: {
      title: "New Assignment",
      course: "",
      points: 100, // Default value for points
      dueDate: "", // Format as 'YYYY-MM-DD'
      availableFromDate: "", // Format as 'YYYY-MM-DD'
      availableUntilDate: "", // Format as 'YYYY-MM-DD'
    },
  };
  

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    addAssignment: (state, action) => {
      state.assignments = [
        { ...action.payload, _id: new Date().getTime().toString() },
        ...state.assignments,
      ];
    },
    deleteAssignment: (state, action) => {
      state.assignments = state.assignments.filter(
        (assignment) => assignment._id !== action.payload
      );
    },
    updateAssignment: (state, action) => {
      state.assignments = state.assignments.map((assignment) => {
        if (assignment._id === action.payload._id) {
          return action.payload;
        } else {
          return assignment;
        }
      });
    },
    setAssignment: (state, action) => {
      state.assignment = action.payload;
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment, setAssignment, setAssignments } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
