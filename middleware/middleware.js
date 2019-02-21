const redirectHomeIfUserIsLoggedIn = (req, res, next) => {
  if (req.session.username) {
    res.redirect('/')
  } else {
    next()
  }
}

const redirectHomeIfUserIsNotLoggedIn = (req, res, next) => {
  if (!req.session.username) {
    throw new Error('403')
  } else {
    next()
  }
}

module.exports = {
  redirectHomeIfUserIsLoggedIn: redirectHomeIfUserIsLoggedIn,
  redirectHomeIfUserIsNotLoggedIn: redirectHomeIfUserIsNotLoggedIn
}
