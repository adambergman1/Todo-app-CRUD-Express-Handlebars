/**
 * registerRouter.
 *
 * @author Adam Bergman
 * @version 1.0
 */

const express = require('express')
const router = express.Router()

// GET and POST
const registerController = require('../controllers/registerController')
router.get('/', registerController.register)
  .post('/', registerController.registerUser)

module.exports = router
