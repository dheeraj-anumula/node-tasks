var path=require('path');
function authentication(req, res, next) {

  const cookies = req.cookies;
  if (cookies.auth_token) {
    next();
  } else {
    res.send(401);
  }
}

function user_authentication(req, res, next) {
  if (req.cookies.auth_token) {
    next();
  }
  else {
    res.sendFile(path.join(__dirname, '../public/login.html'));
  }
}

module.exports = { authentication, user_authentication };