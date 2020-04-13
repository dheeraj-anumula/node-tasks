var express = require('express');
var router = express.Router();
let checkLogin = require('../helpers/auth-helper')
let findUser = require('../helpers/user-helper').findUser;
let addPost = require('../helpers/user-helper').addPost;
const authMiddleware = require('../middleware/auth-middleware').authentication;
let db = require('../helpers/db');

router.post('/auth', function (req, res, next) {
  const cred = req.body;

  if (!cred.username || !cred.password) {
    return res.status(400).send({ status: 'not ok' });
  }

  const isValid = checkLogin(cred.username, cred.password);
  if (isValid) {
    var randomNumber = Math.random().toString();
    randomNumber = randomNumber.substring(2, randomNumber.length);
    res.cookie('username', cred.username, { httpOnly: true, maxAge: 600000 });
    res.cookie('auth_token', randomNumber, { httpOnly: true, maxAge: 600000 });
  }

  if (isValid) {
    res.status(301).header({ Location: '/login' }).send({});
  }
  else {
    res.status(200).send("<h1>Invalid Credentials</h1>");
  }

});

router.get('/user', authMiddleware, function (req, res, next) {
  let user = findUser(req.cookies.username);
  if (user) {
    res.status(200).send(user);
  }
  else {
    res.send("User does not exist");
  }
});

router.get('/posts', authMiddleware, function (req, res, next) {
  let user = findUser(req.cookies.username);
  if (user) {
    res.status(200).send(user.posts);
  }
  else {
    res.send("User does not exist");
  }
});

router.post('/posts/new', authMiddleware, function (req, res, next) {

  const cred = req.body;

  if (!cred.message) {
    return res.status(400).send({ status: 'not ok',error:"message should not be empty" });
  }
  let postAdded = addPost(req.cookies.username, cred.message);

  if (postAdded) {
    res.status(301).header({ Location: '/' + req.cookies.username }).send({});
  }
  else {
    res.status(200).send("<h1>User not found</h1>");
  }
});

module.exports = router;
