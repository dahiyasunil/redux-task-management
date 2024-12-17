import {
  ADD_TASK,
  REMOVE_TASK,
  TOGGLE_TASK,
  CALCULATE_TOTAL_TASKS,
} from "./actions.js";

const initialState = { tasks: [], totalTasks: 0 };

const updateStatus = (tasks, taskId) => {
  tasks.find((task) => task.id === taskId).completed = !tasks.find(
    (task) => task.id === taskId
  ).completed;
  console.log(tasks);

  return tasks;
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case TOGGLE_TASK:
      return {
        ...state,
        tasks: updateStatus(state.tasks, action.payload),
      };
    case CALCULATE_TOTAL_TASKS:
      return {
        ...state,
        totalTasks: state.tasks.length,
      };
    default:
      return state;
  }
};
