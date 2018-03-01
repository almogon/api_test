var app = require('../server.js');
var expect = require('chai').expect;
var request = require('supertest');

var token;

before(function() {
	request(app)
	.post('/login')
	.send({
		'user': 'alvaro111',
		'password': 'd0e46158db756016f8c42700c6bb1a89'
	})
	.expect(200)
	.end(function(err, res) {
		var type = res.body.token_type;
		var acessToken = res.body.access_token;
		token = type + ' ' + acessToken;
		expect(res.body).to.have.property('access_token');
		expect(res.body).to.have.property('token_type');
		expect(res.body.token_type).to.equal('Bearer');
	});
});


describe('Comics unit test', function() {
	it('it should GET a comic list', function() {
		request(app)
		.get('/api/comics')
		.set('Authorization', token)
		.expect(200)
		.end(function(err, res) {
			expect(err).to.be.null;
			expect(res.body).to.be.an('array');
		});
	});

	it('it should GET a comic list fail: petition without credential', function() {
		request(app)
		.get('/api/comics')
		.end(function(err, res) {
			expect(res.statusCode).to.equal(401);
			expect(res.body).to.deep.equal({
				code: 401,
				status: 'Incorrect token'
			});
		});
	});

	it('it should GET comic detail', function() {
		request(app)
		.get('/api/comics/1003')
		.set('Authorization', token)
		.end(function(err, res) {
			expect(res.body).to.be.an('array');
			expect(res.body.length).to.equal(1);
			expect(res.body[0].id).to.equal(1003);
		});
	});

	it('it should GET comic detail fail: id comic not valid', function() {
		request(app)
		.get('/api/comics/1')
		.set('Authorization', token)
		.end(function(err, res) {
			expect(res.statusCode).to.equal(500);
			expect(res.body.code).to.equal(404);
		});
	});
});


describe('Hero unit test', function() {
	it('it should GET a hero list', function() {
		request(app)
		.get('/api/heroes')
		.set('Authorization', token)
		.expect(200)
		.end(function(err, res) {
			expect(err).to.be.null;
			expect(res.body).to.be.an('array');
		});
	});

	it('it should GET a hero list fail: petition without credential', function() {
		request(app)
		.get('/api/heroes')
		.end(function(err, res) {
			expect(res.statusCode).to.equal(401);
			expect(res.body).to.deep.equal({
				code: 401,
				status: 'Incorrect token'
			});
		});
	});

	it('it should GET hero detail', function() {
		request(app)
		.get('/api/heroes/1011334')
		.set('Authorization', token)
		.end(function(err, res) {
			expect(res.body).to.be.an('array');
			expect(res.body.length).to.equal(1);
			expect(res.body[0].id).to.equal(1011334);
		});
	});

	it('it should GET hero detail fail: id hero not valid', function() {
		request(app)
		.get('/api/heroes/1')
		.set('Authorization', token)
		.end(function(err, res) {
			expect(res.statusCode).to.equal(500);
			expect(res.body.code).to.equal(404);
		});
	});
});

describe('User unit test', function() {
	it('it should GET the favourite hero but no hero in storage', function() {
		request(app)
		.get('/api/user/hero')
		.set('Authorization', token)
		.end(function(err, res) {
			expect(res.statusCode).to.equal(500);
			expect(res.body).to.equal({
				code: 500,
				status: 'User has not selected a hero'
			});
		});
	});

	it('it should POST the favourite hero: fail no id hero', function() {
		request(app)
		.post('/api/user/hero')
		.set('Authorization', token)
		.end(function(err, res) {
			expect(res.statusCode).to.equal(404);
		});
	});

	it('it should GET favourite hero detail after post', function() {
		request(app)
		.get('/api/user/hero')
		.set('Authorization', token)
		.end(function(err, res) {
			expect(res.statusCode).to.equal(200);
			expect(req.body).to.not.be.null;
		});
	});
});