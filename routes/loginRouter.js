const express = require('express')
const router = express.Router()

const loginController = require('../controllers/loginController')
router.get('/', loginController.login)
  .post('/', loginController.loginUser)

module.exports = router
