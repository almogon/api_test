var router = require('express').Router();
var auth = require('./../../auth');
var request = require('./../../../utils/commons').request;


router.get('/', auth, function(req, res, next){
	LOG.debug('Get comics list');
	request.get('/comics')
		.then(function (response) {
			return res.json(response.data.results);
		})
		.catch(function (err) {
			LOG.error('Error get comics', err.error);
			return res.status(500).send(err.error);
		});
});

router.get('/:idComic', auth, function(req, res, next){
	var idComic = req.params.idComic;
	request.get('/comics/' + idComic)
		.then(function (response) {
			return res.json(response.data.results);
		})
		.catch(function (err) {
			LOG.error('Error get comic detail', err.error);
			return res.status(500).send(err.error);
		});
});

module.exports = router;