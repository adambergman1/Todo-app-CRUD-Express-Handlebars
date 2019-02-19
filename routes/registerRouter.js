const express = require('express')
const router = express.Router()

const registerController = require('../controllers/registerController')
router.get('/', registerController.register)
  .post('/', registerController.registerUser)

module.exports = router
