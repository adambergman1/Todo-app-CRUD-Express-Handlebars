const loginController = {}

loginController.login = (req, res, next) => res.render('login/index')

loginController.loginUser = async (req, res) => {
  let sess = req.session
  sess.username = req.body.username
  sess.id = req.sessionID

  await sess.save()

  res.render('todo/index', { username: req.body.username })
}
module.exports = loginController
