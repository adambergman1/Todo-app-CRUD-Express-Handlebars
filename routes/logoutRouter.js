/**
 * logoutRouter.
 *
 * @author Adam Bergman
 * @version 1.0
 */

const express = require('express')
const router = express.Router()

// POST
const logoutController = require('../controllers/logoutController')
router.post('/', logoutController.logout)

module.exports = router
