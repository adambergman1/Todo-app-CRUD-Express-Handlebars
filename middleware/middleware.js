const redirectHome = (req, res, next) => {
  if (req.session.username) {
    req.session.flash = { type: 'danger', text: 'You are already logged in' }
    res.redirect('/')
  } else {
    next()
  }
}

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
