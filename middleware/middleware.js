/**
 * Middleware to be executed on differet requests.
 *
 * @author Adam Bergman
 * @version 1.0
 */

/**
 * Redirect to home URL if user is already logged in
 */
const redirectHome = (req, res, next) => {
  if (req.session.username) {
    req.session.flash = { type: 'danger', text: 'You are already logged in' }
    res.redirect('/')
  } else {
    next()
  }
}

/**
 * Throw an error if user is not logged in
 */
const notLoggedInUser = (req, res, next) => {
  if (!req.session.username) {
    throw new Error('403')
  } else {
    next()
  }
}

module.exports = {
  redirectHome: redirectHome,
  notLoggedInUser: notLoggedInUser
}
