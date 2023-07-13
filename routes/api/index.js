const router = require('express').Router();

const user = require('./userRoutes');
const thoughts = require('./thoughtsRoutes.js');

router.use('/user', user);
router.use('/thoughts', thoughts);

module.exports = router;