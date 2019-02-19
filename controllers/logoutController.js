const logoutController = {}

logoutController.logout = (req, res) => {
  console.log('loggar ut')
  req.session.destroy(err => {
    if (err) { console.log(err) } else {
      res.clearCookie('scrud')
      res.redirect('/home/index')
      console.log('loggar ut')
    }
  })
}

module.exports = logoutController
