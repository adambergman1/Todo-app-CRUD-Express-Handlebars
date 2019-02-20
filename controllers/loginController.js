const User = require('../models/user')
const loginController = {}

loginController.login = (req, res, next) => res.render('login/index')

loginController.loginUser = async (req, res) => {
  let user = await User.findOne({ username: req.body.username })
  if (!user) {
    req.session.flash = { type: 'danger', text: 'Please check your credentials' }
    res.redirect('/login')
  }
  if (user) {
    let pwdMatch = await user.comparePassword(req.body.password)
    if (pwdMatch) {
      let sess = req.session
      sess.username = req.body.username
      sess.id = req.sessionID

      await sess.save()
      res.redirect('.')
    } else {
      req.session.flash = { type: 'danger', text: 'Please check your credentials' }
      res.redirect('/login')
    }
  }
}

module.exports = loginController
