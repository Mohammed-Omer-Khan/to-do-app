import axios from 'axios';
import './axios.css';

//ToDo : Interceptors

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    document.body.classList.add('loading-indicator');
    return config;
  }, function (error) {
    // Do something with request error
    document.body.classList.remove('loading-indicator');
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  document.body.classList.remove('loading-indicator');
  return response;
}, function (error) {
  // Do something with response error
  document.body.classList.remove('loading-indicator');
  return Promise.reject(error);
});

export default axios;