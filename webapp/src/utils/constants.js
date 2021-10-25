export default function constants() {
    const API_GW = 'http://localhost:5000/api/v1/';
    return {
      API_END_POINTS: {
        CREATE_TASK: `${API_GW}website/createtask`,
        TASKS: `${API_GW}website/tasks`,
        PARTICULAR_TASK: `${API_GW}website/particulartask`, 
        CHANGE_STATUS: `${API_GW}website/changestatus`,
        EDIT_TASK: `${API_GW}website/edittask`,
        DELETE_TASK: `${API_GW}website/deletetask`,
      },
    };
  }; 