var router = require('express').Router();
var auth = require('./../../auth');
var request = require('./../../../utils/commons').request;
var utils = require('./../../../utils/commons').utils;
var errors = require('./../../../constants/errors').errors;

router.get('/hero', auth, function(req, res, next){
	var hero = store.get('userHero');
	// Add call to DB and take info from hero
	if(utils.isNullOrEmptyOrUndefined(hero)) {
		LOG.error('Error get favourite hero, not hero in storage or DB');
		return res.status(500).send({
			code: 500,
			status: 'User has not selected a hero'
		});
	}
	return res.send(hero);
});

router.post('/hero', auth, function(req, res, next){
	var idHero = req.body.idHero;
	LOG.debug('Post hero', idHero);
	if(utils.isNullOrEmptyOrUndefined(idHero)) {
		return res.status(404).send(errors.PARAMS_NOT_VALID);
	}
	request.get('/characters/' + idHero)
		.then(function (response) {
			store.set('userHero', response.data.results[0]);
			return res.json(response.data.results);
		})
		.catch(function (err) {
			LOG.error('Error get hero from marvel: ', err.error);
			return res.status(500).send(err.error);
		});
});


module.exports = router;