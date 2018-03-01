var router = require('express').Router();
var path = '/api';

router.use('/login', require('./api/login.js'));
router.use(path + '/comics', require('./api/public/comics'));
router.use(path + '/heroes', require('./api/public/heroes'));
router.use(path + '/user', require('./api/public/user'));

module.exports = router;
