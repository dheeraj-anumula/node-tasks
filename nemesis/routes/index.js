var express = require('express');
var router = express.Router();
var path = require('path');
let findUser = require('../helpers/user-helper').findUser;
let user_authentication = require('../middleware/auth-middleware').user_authentication;

router.get('/', function (req, res, next) {
  if (req.cookies.auth_token) {
    res.sendFile(path.join(__dirname, '../private/home.html'));
  }
  else {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  }
});

router.get('/login', user_authentication, function (req, res, next) {
  res.status(301).header({ Location: '/' + req.cookies.username }).send({});
});

router.get('/logout', function (req, res, next) {
  res.clearCookie('auth_token');
  res.clearCookie('username');
  res.status(301).header({ Location: '/login' }).send({});
});

router.get('/user-details', user_authentication, function (req, res, next) {
  res.sendFile(path.join(__dirname, '../private/user-details.html'));
});

router.get('/:username', user_authentication, function (req, res) {

  const pathParams = req.params;
  const user = findUser(pathParams.username);
  if (!user) {
    return res.send('User not found');
  }

  res.sendFile(path.join(__dirname, '../private/posts.html'));
});


module.exports = router;
