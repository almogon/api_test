var rp = require('request-promise');
var jwt = require('jwt-simple');
var md5 = require('md5');
var Promise = require('promise');
var marvel = require('./../constants/constants').constants;
var secret = require('./../config/config').secret.secret;

exports.utils = {
	convertToJson: function (obj) {
		return JSON.stringify(obj);
	},
	isNullOrEmptyOrUndefined: function(obj){
		if (_.isNull(obj)){ return true; }
		if (_.isUndefined(obj)){ return true; }
		if (obj === ''){ return true; }
		if (_.isArray(obj) && obj.length === 0) { return true; }

		return false;
	}
};

exports.request = {
	get: function (url, params) {
		return new Promise(function (resolve, reject) {
			var options = getOptions(url, params, 'GET');
			rp(options)
				.then(function(res) {
					resolve(res);
				})
				.catch(function(err) {
					reject(err);
				});
		});

	function getOptions(url, params, method) {
		var ts = moment().valueOf();
		params = _.isNull(params) || _.isUndefined(params) ? {} : params;
		params = _.extend({
			ts: ts,
			apikey: marvel.TOKEN_PUBLIC,
			hash: md5(ts + secret + marvel.TOKEN_PUBLIC)
		}, params);
		return {
			method: method,
			uri: marvel.SERVER_URL + url,
			qs: params,
			json: true
		};
	};
		
	}
}


exports.createToken = function (user) {
	var payload = {
		user: user,
		exp: moment().add(30,'m').unix()
	};
	var token = jwt.encode(payload, secret);

	return {
		access_token: token,
		token_type: 'Bearer'
	};
}