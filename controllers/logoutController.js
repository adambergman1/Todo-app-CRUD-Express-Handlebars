const logoutController = {}

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
