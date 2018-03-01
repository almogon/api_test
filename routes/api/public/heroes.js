var router = require('express').Router();
var auth = require('./../../auth');
var request = require('./../../../utils/commons').request;


router.get('/', auth, function(req, res, next){
	request.get('/characters')
		.then(function (response) {
			return res.json(response.data.results);
		})
		.catch(function (err) {
			LOG.error('Error get heroes', err.error);
			return res.status(500).send(err.error);
		});
});

router.get('/:id', auth, function(req, res, next){
	var id = req.params.id;
	request.get('/characters/' + id)
		.then(function (response) {
			return res.json(response.data.results);
		})
		.catch(function (err) {
			LOG.error('Error get hero detail', err.error);
			return res.status(500).send(err.error);
		});
});

module.exports = router;