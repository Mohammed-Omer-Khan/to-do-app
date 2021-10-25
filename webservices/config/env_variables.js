keys = {
    process: {
      env: {
        PORT: 5000,
        API_VERSION: 'v1',
        mongoURI: 'mongodb://localhost:27017/todo',
        baseURL: 'http://localhost:5000',
      }
    }
  };
  
  module.exports = keys.process;
  