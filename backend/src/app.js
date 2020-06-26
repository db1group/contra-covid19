require('dotenv').config();
require('./extensions/arrary-extensions');
const express = require('express');
const compression = require('compression');
const pino = require('pino-http');
const helmet = require('helmet');
const cors = require('cors');
const redis = require('./redis');

// Force Define TimeZone
process.env.TZ = 'America/Sao_Paulo';

const router = require('./routes');

const app = express();

app.use(compression());
app.use(helmet());
app.use(pino());
app.use(express.json());
app.use(cors());

redis(app);
router(app);

module.exports = app;
