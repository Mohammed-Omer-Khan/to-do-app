
import { message } from 'antd';
import { SET_ERRORS, RESET_ERRORS } from './types';

export const setErrors = input => dispatch => {
  let errorMsg = input?.response?.data?.data?.message;
  if (!errorMsg) {
    errorMsg = 'An error has occured, please try again after sometime.';
  }
  const error = {
    msg: errorMsg
  };

  message.destroy();
  message.error(errorMsg);
  dispatch({
    type: SET_ERRORS,
    payload: error
  });
};

export const resetErrors = _ => dispatch => {
  dispatch({
    type: RESET_ERRORS,
    payload: {}
  })
};