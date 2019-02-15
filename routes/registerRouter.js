const express = require('express')
const router = express.Router()

const controller = require('../controllers/registerController')

router.get('/', controller.register)
  .post('/', controller.registerUser)

module.exports = router
