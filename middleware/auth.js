module.exports = {
  ensureAuth: function (req, res, next) {
    console.log('ensureAuth')
    if (req.isAuthenticated()) {
      console.log('isAuthenticated')
      return next()
    } else {
      console.log('isNotAuthenticated')
      res.redirect('/')
    }
  },
  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) {
      console.log('isGuest')
      return next()
    } else {
      console.log('isNotGuest')
      res.redirect('/dashboard')
    }
  },
}
