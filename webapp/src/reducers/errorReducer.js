import {
    SET_ERRORS,
    RESET_ERRORS
  } from '../actions/types';
  
  
  
  const initialState = {
    errors: {}
  };
  
  
  const errorReducer = (
    state = initialState, {
      action,
      payload
    }
  ) => {
    switch(action) {
      case SET_ERRORS: 
      return {
        ...state,
        errors: payload
      };
      case RESET_ERRORS: 
      return {
        ...state,
        errors: {}
      };
      default:
        return state;
    }
  };
  export default errorReducer;