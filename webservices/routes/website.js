const express = require('express')
const router = express.Router()
const websiteService = require('../services/website');


router.post('/createtask', websiteService.createTask)
router.get('/tasks', websiteService.tasks)
router.get('/particulartask', websiteService.particularTask)
router.post('/changestatus', websiteService.changeStatus)
router.post('/edittask', websiteService.editTask)
router.post('/deletetask', websiteService.deleteTask)

module.exports = router;