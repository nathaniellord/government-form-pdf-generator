import express = require('express');
import { StateWithholdingForms } from './state-taxes/states';
import expressValidator from 'express-validator';
import bodyParser from 'body-parser';
const generateFederalForm = require('./federal/federal');
import config from 'config';

// Create a new express application instance
const app: express.Application = express();
app.use(bodyParser.json());
app.use(expressValidator());

const stateWithholding = new StateWithholdingForms();

// Heartbeat
app.get('/', function (req, res) {
  res.send({ status: 'active' });
  res.end();
});
// State Withholding Forms
app.get('/state/:state/withholding', function (req, res) {
  stateWithholding.generateStateForm(req.params.state, req, res);
  res.end();
});
app.post('/state/:state/withholding', function (req, res) {
  stateWithholding.generateStateForm(req.params.state, req, res);
  res.end();
});
// Federal Forms
app.get('/federal/:formName', function (req, res) {
  generateFederalForm(req.params.formName, req, res);
  res.end();
});
app.listen(config.get('port'));
console.log(`Running app on port ${config.get('port')}`);
