/**
 * To-do items routes.
 *
 * @author Adam Bergman
 * @version 1.0
 */

const express = require('express')
const router = express.Router()

const controller = require('../controllers/toDoController')
const middlewares = require('../middleware/middleware')

// GET /
router.get('/', controller.index)

// GET, POST /create
router.route('/create')
  .get(middlewares.notLoggedInUser, controller.create)
  .post(middlewares.verifyUser, controller.createPost)

// GET, POST /edit
router.get('/edit/:id', middlewares.notLoggedInUser, controller.edit)
router.post('/edit', middlewares.verifyUser, controller.editPost)

// GET, POST  /delete
router.get('/delete/:id', middlewares.notLoggedInUser, controller.delete)
router.post('/delete', middlewares.verifyUser, controller.deletePost)

// Exports.
module.exports = router
