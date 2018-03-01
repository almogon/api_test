var router = require('express').Router();
var users = require('./../../db/database').users;
var ERRORS = require('./../../constants/errors').errors;
var utils = require('./../../utils/commons').utils;
var createToken = require('./../../utils/commons').createToken;

router.post('/', function(req, res, next){
	// We find user in the database, in this case, database is a mock
	var body = req.body;
	var user = body.user;
	var pass = body.password;

	var userDB = users[user];
	if(utils.isNullOrEmptyOrUndefined(userDB) || utils.isNullOrEmptyOrUndefined(pass) || pass !== userDB.PASS) {
		LOG.error('Login fail: credentials not valid');
		return res.sendStatus(ERRORS.USER_NOT_VALID.status);
	}
	return res.json(createToken(userDB));
});

module.exports = router;