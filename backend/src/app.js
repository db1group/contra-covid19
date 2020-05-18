require('dotenv').config();
require('./extensions/arrary-extensions');
const express = require('express');
const compression = require('compression');
const pino = require('pino-http');
const helmet = require('helmet');
const cors = require('cors');

const router = require('./routes');

const app = express();

app.use(compression());
app.use(helmet());
app.use(pino());
app.use(express.json());
app.use(cors());

router(app);

module.exports = app;
