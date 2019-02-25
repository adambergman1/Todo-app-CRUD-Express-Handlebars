/**
 * loginRouter.
 *
 * @author Adam Bergman
 * @version 1.0
 */

const express = require('express')
const router = express.Router()

// GET and POST
const loginController = require('../controllers/loginController')
router.get('/', loginController.login)
  .post('/', loginController.loginUser)

module.exports = router
