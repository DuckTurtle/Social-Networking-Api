const router = require('express').Router();

const api = require('./api');

router.use('/api', api);

router.use((req, res) => {
    res.status(404).send('404 Error, /n the ship is sinking');
});

module.exports = router;