const loginController = {}

loginController.login = (req, res, next) => res.render('login/index')

loginController.loginUser = (req, res) => {
  let sess = req.session
  sess.username = req.body.username
  sess.pass = req.body.password
  console.log(sess)
  //   console.log(req.body.username)
  res.redirect('/')
  res.end('done')
}

module.exports = loginController
