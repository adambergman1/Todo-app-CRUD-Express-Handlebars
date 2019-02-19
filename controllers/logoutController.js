const logoutController = {}

logoutController.logout = (req, res, next) => {
  console.log('loggar ut')
  req.session.destroy(err => {
    if (err) {
      console.log(err)
    } else {
      res.clearCookie('scrud')
      res.redirect('/')
      console.log('loggar ut')
    }
  })
}

module.exports = logoutController
