/**
 * logoutController.
 *
 * @author Adam Bergman
 * @version 1.0
 */

const logoutController = {}

/**
 * logout POST
 */
logoutController.logout = (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err)
    } else {
      res.clearCookie('scrud')
      res.redirect('/')
    }
  })
}

module.exports = logoutController
