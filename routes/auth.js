var jwt = require('jwt-simple');
var secret = require('./../config/config').secret.secret;
var errors = require('./../constants/errors').errors;


function getTokenFromHeader(req){
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
      req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }

  return null;
}

module.exports = function(req, res, next) {
  var token = getTokenFromHeader(req);
  if (_.isNull(token)) {
    LOG.error('Error auth: token null');
    return res.status(401).send(errors.TOKEN_NOT_FOUND);
  }
  try {
    var payload = jwt.decode(token, secret);
    if(payload.exp <= moment().unix()) {
      return res.status(401).send(errors.TOKEN_EXPIRED);
    }
    req.user = payload.user;
    next();
  } catch(err) {
    LOG.error('Error auth: token not valid');
    return res.status(401).send(errors.TOKEN_NOT_FOUND);
  }
};