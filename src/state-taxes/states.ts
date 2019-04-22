const alabama = require('./alabama/alabama');

export class StateWithholdingForms {

  constructor() {
    return this;
  }

  generateStateForm(state: string, req: any, res: any) {
    let stateTaxForm
    if (state === 'al') {
      stateTaxForm = alabama;
    } else if (state === 'az') {
      stateTaxForm = require('./arizona');
    } else if (state === 'ar') {
      stateTaxForm = require('./arkansas');
    } else if (state === 'ca') {
      stateTaxForm = require('./california');
    } else if (state === 'ct') {
      stateTaxForm = require('./connecticut');
    } else if (state === 'dc') {
      stateTaxForm = require('./district-of-columbia');
    } else if (state === 'ga') {
      stateTaxForm = require('./georgia');
    } else if (state === 'hi') {
      stateTaxForm = require('./hawaii');
    } else if (state === 'il') {
      stateTaxForm = require('./illinois');
    } else if (state === 'in') {
      stateTaxForm = require('./indiana');
    } else if (state === 'ia') {
      stateTaxForm = require('./iowa');
    } else if (state === 'ks') {
      stateTaxForm = require('./kansas');
    } else if (state === 'ky') {
      stateTaxForm = require('./kentucky');
    } else if (state === 'la') {
      stateTaxForm = require('./louisiana');
    } else if (state === 'me') {
      stateTaxForm = require('./maine');
    } else if (state === 'md') {
      stateTaxForm = require('./maryland');
    } else if (state === 'ma') {
      stateTaxForm = require('./massachusetts');
    } else if (state === 'mi') {
      stateTaxForm = require('./michigan');
    } else if (state === 'ms') {
      stateTaxForm = require('./mississippi');
    } else if (state === 'mo') {
      stateTaxForm = require('./missouri');
    } else if (state === 'nj') {
      stateTaxForm = require('./new-jersey');
    } else if (state === 'ny') {
      stateTaxForm = require('./new-york');
    } else if (state === 'nc') {
      stateTaxForm = require('./north-carolina');
    } else if (state === 'oh') {
      stateTaxForm = require('./ohio');
    } else if (state === 'ok') {
      stateTaxForm = require('./oklahoma');
    } else if (state === 'or') {
      stateTaxForm = require('./oregon');
    } else if (state === 'ri') {
      stateTaxForm = require('./rhode-island');
    } else if (state === 'vt') {
      stateTaxForm = require('./vermont');
    } else if (state === 'va') {
      stateTaxForm = require('./virginia');
    } else if (state === 'wv') {
      stateTaxForm = require('./west-virginia');
    } else if (state === 'wi') {
      stateTaxForm = require('./wisconsin');
    }
    if (stateTaxForm) {
      stateTaxForm(req, res);
    } else {
      res.status(404).send(`State withholding form not located for the state ${state}`);
    }
  }

}
