import express = require('express');
import { StateWithholdingForms } from './state-taxes/states';
const generateStateForm = require('./state-taxes/states');
const generateFederalForm = require('./federal/federal');
import config from 'config';

// Create a new express application instance
const app: express.Application = express();

const stateWithholding = new StateWithholdingForms();

// Heartbeat
app.get('/', function (req, res) {
  res.send({ status: 'active' });
  res.end();
});
// State Withholding Forms
app.get('/state/:state/withholding/:year?', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/pdf' });
  stateWithholding.generateStateForm(req.params.state, req, res, req.params.year);
  res.end();
});
app.post('/state/:state/withholding/:year?', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/pdf' });
  stateWithholding.generateStateForm(req.params.state, req, res, req.params.year);
  res.end();
});
// Federal Forms
app.get('/federal/:formName/:year?', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/pdf' });
  generateFederalForm(req.params.formName, req, res);
  res.end();
});
app.listen(config.get('port'));
