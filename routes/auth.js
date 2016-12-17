const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.get('/login', passport.authenticate('github'));

router.get('/github/callback', passport.authenticate('github', {failureRedirect: '/'}), (req, res) => {
    const token = jwt.sign(req.user, 'super_secret');
    console.log('*');
    console.log(`*  User ${req.user.username} with GitHub ID ${req.user.gitId} authorized!`);
    console.log('*');
    res.cookie('token', token);
    res.redirect('http://localhost:3000/');
  });

router.get('/logout', (req, res) => {
  req.logout();
  res.clearCookie('token');
  res.redirect('http://localhost:3000/');
});

module.exports = router;
