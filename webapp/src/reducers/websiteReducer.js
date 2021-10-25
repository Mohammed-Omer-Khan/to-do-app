import {
  SET_TASK,
  SET_TASKS,
  SET_PARTICULAR_TASK,
  SET_CHANGE_STATUS,
  SET_EDIT_TASK,
  SET_DELETE_TASK
} from '../actions/types';

const initialState = {
  createTask: false,
  tasks: [],
  particularTask: {},
  changeStatus: false,
  editTask: false,
  deleteTask: false
};

const websiteReducer = (
  state = initialState, {
    type,
    payload
  }) => {
  switch (type) {
    case SET_TASK:
      return {
        ...state,
        createTask: true
      };
    case SET_TASKS:
      return {
        ...state,
        tasks: payload
      };
    case SET_PARTICULAR_TASK:
      return {
        ...state,
        particularTask: payload
      };
    case SET_CHANGE_STATUS:
      return {
        ...state,
        changeStatus: true
      };
    case SET_EDIT_TASK:
      return {
        ...state,
        editTask: true
      }
      case SET_DELETE_TASK:
        return {
          ...state,
          deleteTask: true
        }
    default:
      return state;
  }
};
export default websiteReducer;