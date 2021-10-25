import axios from 'axios';
import constants from '../utils/constants';
import { message } from 'antd';
import { setErrors } from './errorActions';
import {
  SET_TASK,
  SET_TASKS,
  SET_PARTICULAR_TASK,
  SET_CHANGE_STATUS,
  SET_EDIT_TASK,
  SET_DELETE_TASK
} from './types';

const { API_END_POINTS } = constants();

export const setCreateTask = payload => ({
  type: SET_TASK,
  payload
});


export const createTask = input => async dispatch => {
  try {
    const formData = new FormData();
    Object.keys(input).map(
      key => formData.append(key, input[key])
    )
    const response = await axios.post(API_END_POINTS.CREATE_TASK, formData);
    if (response.data.success) {
      dispatch(setCreateTask(response.data.data));
      message.success('Task created successfully');
    }
  } catch (err) {
    dispatch(setErrors(err));
  }
}

export const setEditTask = payload => ({
  type: SET_EDIT_TASK,
  payload
});


export const editTask = input => async dispatch => {
  try {
    const formData = new FormData();
    Object.keys(input).map(
      key => formData.append(key, input[key])
    )
    const response = await axios.post(API_END_POINTS.EDIT_TASK, formData);
    if (response.data.success) {
      dispatch(setEditTask(response.data.data));
      message.success('Task edited successfully');
    }
  } catch (err) {
    dispatch(setErrors(err));
  }
}

export const setTasks = payload => ({
  type: SET_TASKS,
  payload
});


export const tasks = _ => async dispatch => {
  try {
    const response = await axios.get(API_END_POINTS.TASKS);
    if (response.data.success) {
      dispatch(setTasks(response.data.data));
    }
  } catch (err) {
    dispatch(setErrors(err));
  }
}


export const setParticularTask = payload => ({
  type: SET_PARTICULAR_TASK,
  payload
});


export const particularTask = input => async dispatch => {
  try {
    const response = await axios.get(API_END_POINTS.PARTICULAR_TASK, {params: {taskId: input}});
    if (response.data.success) {
      dispatch(setParticularTask(response.data.data));
    }
  } catch (err) {
    dispatch(setErrors(err));
  }
}

export const setChangeStatus = payload => ({
  type: SET_CHANGE_STATUS,
  payload
});


export const changeStatus = input => async dispatch => {
  try {
    const response = await axios.post(API_END_POINTS.CHANGE_STATUS, input);
    if (response.data.success) {
      dispatch(setChangeStatus(response.data.data));
    }
  } catch (err) {
    dispatch(setErrors(err));
  }
}


export const setDeleteTask = payload => ({
  type: SET_DELETE_TASK,
  payload
});


export const deleteTask = input => async dispatch => {
  try {
    const response = await axios.post(API_END_POINTS.DELETE_TASK, input);
    if (response.data.success) {
      dispatch(setDeleteTask(response.data.data));
      message.success('Task deleted successfully');
    }
  } catch (err) {
    dispatch(setErrors(err));
  }
}