const express = require('express');

const router = express.Router();

router.get('/actuator/health', (_, res) => res.send());

module.exports = router;
