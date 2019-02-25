/**
 * registerController.
 *
 * @author Adam Bergman
 * @version 1.0
 */

const User = require('../models/user')

const registerController = {}

/**
 * register GET
 */
registerController.register = (req, res, next) => res.render('register/index')

/**
 * register POST
 */
registerController.registerUser = async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })

    await newUser.save()
    req.session.flash = { type: 'success', text: 'You are registrered! Please re-enter your credentials to login.' }
    res.redirect('./login')
  } catch (err) {
    req.session.flash = { type: 'danger', text: 'User already exists OR characters are invalid' }
    res.redirect('./register')
  }
}

module.exports = registerController
