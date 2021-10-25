const Tasks = require('../models/Task');
const formidable = require('formidable');
const upload = require('../config/mediaUpload');

const createTask = async (req, res) => {
  const response = {};
  try {

    const form = new formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      try {
        response.success = true;
        response.status = 200;

        if (!fields.title) {
          throw new Error('Title is required');
        } else if (!fields.description) {
          throw new Error('Description is required');
        }

        if (files.media) {
          if (files.media.name) {
            const id = `${Math.floor(Math.random() * 900000)}-Task-${Date.now()}`
            const uploadedFile = await upload(files, id);
            let fileName = '';
            if (uploadedFile) {
              fileName = uploadedFile.imagePath;
            }
            new Tasks({
              title: fields.title,
              description: fields.description,
              media: fileName
            }).save();
          }
        } else {
          new Tasks({
            title: fields.title,
            description: fields.description,
          }).save();
        }

        response.data = {
          message: 'Task created successfully'
        };

        res.json(response);

      } catch (err) {
        response.success = false;
        response.status = 400;
        response.data = {
          message: err.message
        };
        res.status(response.status).json(response);
      }
    })

  } catch (err) {
    response.success = false;
    response.status = 500;
    response.data = {
      message: err.message
    };
    res.status(response.status).json(response);
  }
};

const tasks = async (req, res) => {
  const response = {};
  try {
    response.success = true;
    response.status = 200;

    const tasks = await Tasks.find().lean();

    response.data = {
      tasks
    }
    res.json(response);
    
  } catch (err) {
    response.success = false;
    response.status = 400;
    response.data = {
      message: err.message
    };
    res.status(response.status).json(response);
  }
};


const particularTask = async (req, res) => {
  const response = {};
  try {
    response.success = true;
    response.status = 200;

    const taskId = req.query.taskId;

    if(!taskId) {
      throw new Error('Task id is required');
    }

    const taskDetails = await Tasks.findOne({_id: taskId}).select({'_id': 0}).lean();

    response.data = {
      taskDetails
    }
    res.json(response);
    
  } catch (err) {
    response.success = false;
    response.status = 400;
    response.data = {
      message: err.message
    };
    res.status(response.status).json(response);
  }
};

const changeStatus = async (req, res) => {
  const response = {};
  try {
    response.success = true;
    response.status = 200;

    const taskId = req.body.taskId;
    const status = req.body.status;

    if(!taskId) {
      throw new Error('Task id is required');
    }

    await Tasks.findOneAndUpdate({_id: taskId}, {$set: {status: status}}).lean();

    response.data = {
      message: 'Status changes successfully'
    }
    res.json(response);
    
  } catch (err) {
    response.success = false;
    response.status = 400;
    response.data = {
      message: err.message
    };
    res.status(response.status).json(response);
  }
};


const editTask = async (req, res) => {
  const response = {};
  try {

    const form = new formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      try {
        response.success = true;
        response.status = 200;

        if (!fields.taskId) {
          throw new Error('Tsk id is required');
        }

        if (files.media) {
          if (files.media.name) {
            const id = `${Math.floor(Math.random() * 900000)}-Task-${Date.now()}`
            const uploadedFile = await upload(files, id);
            let fileName = '';
            if (uploadedFile) {
              fileName = uploadedFile.imagePath;
            }
            fields.media = fileName;
          }
        }

        await Tasks.findOneAndUpdate({_id: fields.taskId}, {$set: {...fields}}).lean();

        response.data = {
          message: 'Task created successfully'
        };

        res.json(response);

      } catch (err) {
        response.success = false;
        response.status = 400;
        response.data = {
          message: err.message
        };
        res.status(response.status).json(response);
      }
    })

  } catch (err) {
    response.success = false;
    response.status = 500;
    response.data = {
      message: err.message
    };
    res.status(response.status).json(response);
  }
};

const deleteTask = async (req, res) => {
  const response = {};
  try {
    response.success = true;
    response.status = 200;

    const taskId = req.body.taskId;

    if(!taskId) {
      throw new Error('Task id is required');
    }

    await Tasks.findOneAndUpdate({_id: taskId}, {$set: {isDeleted: true}}).lean();

    response.data = {
      message: 'Task deleted successfully'
    }
    res.json(response);
    
  } catch (err) {
    response.success = false;
    response.status = 400;
    response.data = {
      message: err.message
    };
    res.status(response.status).json(response);
  }
};






module.exports = {
  createTask,
  tasks,
  particularTask,
  changeStatus,
  editTask,
  deleteTask
}