import hummus from 'hummus';
const utils = require('../utils');
const fs = require('fs');

const alabama = require('./alabama/withholding.config');
const arizona = require('./arizona/withholding.config');
const arkansas = require('./arkansas/withholding.config');
const california = require('./california/withholding.config');
const connecticut = require('./connecticut/withholding.config');
const districtOfColumbia = require('./district-of-columbia/withholding.config');
const georgia = require('./georgia/withholding.config');
const hawaii = require('./hawaii/withholding.config');
const illinois = require('./illinois/withholding.config');
const indiana = require('./indiana/withholding.config');
const iowa = require('./iowa/withholding.config');
const kansas = require('./kansas/withholding.config');
const kentucky = require('./kentucky/withholding.config');
const louisiana = require('./louisiana/withholding.config');
const maine = require('./maine/withholding.config');
const maryland = require('./maryland/withholding.config');
const massachusetts = require('./massachusetts/withholding.config');
const michigan = require('./michigan/withholding.config');
const mississippi = require('./mississippi/withholding.config');
const missouri = require('./missouri/withholding.config');
const newJersey = require('./new-jersey/withholding.config');
const newYork = require('./new-york/withholding.config');
const northCarolina = require('./north-carolina/withholding.config');
const ohio = require('./ohio/withholding.config');
const oklahoma = require('./oklahoma/withholding.config');
const oregon = require('./oregon/withholding.config');
const rhodeIsland = require('./rhode-island/withholding.config');
const vermont = require('./vermont/withholding.config');
const virginia = require('./virginia/withholding.config');
const westVirginia = require('./west-virginia/withholding.config');
const wisconsin = require('./wisconsin/withholding.config');

export class StateWithholdingForms {

  constructor() {
    return this;
  }

  generateStateForm(state: string, req: any, res: any) {
    let stateConfig
    if (state === 'al') {
      stateConfig = alabama;
    } else if (state === 'az') {
      stateConfig = arizona;
    } else if (state === 'ar') {
      stateConfig = arkansas;
    } else if (state === 'ca') {
      stateConfig = california;
    } else if (state === 'ct') {
      stateConfig = connecticut;
    } else if (state === 'dc') {
      stateConfig = districtOfColumbia;
    } else if (state === 'ga') {
      stateConfig = georgia;
    } else if (state === 'hi') {
      stateConfig = hawaii;
    } else if (state === 'il') {
      stateConfig = illinois;
    } else if (state === 'in') {
      stateConfig = indiana;
    } else if (state === 'ia') {
      stateConfig = iowa;
    } else if (state === 'ks') {
      stateConfig = kansas;
    } else if (state === 'ky') {
      stateConfig = kentucky;
    } else if (state === 'la') {
      stateConfig = louisiana;
    } else if (state === 'me') {
      stateConfig = maine;
    } else if (state === 'md') {
      stateConfig = maryland;
    } else if (state === 'ma') {
      stateConfig = massachusetts;
    } else if (state === 'mi') {
      stateConfig = michigan;
    } else if (state === 'ms') {
      stateConfig = mississippi;
    } else if (state === 'mo') {
      stateConfig = missouri;
    } else if (state === 'nj') {
      stateConfig = newJersey;
    } else if (state === 'ny') {
      stateConfig = newYork;
    } else if (state === 'nc') {
      stateConfig = northCarolina;
    } else if (state === 'oh') {
      stateConfig = ohio;
    } else if (state === 'ok') {
      stateConfig = oklahoma;
    } else if (state === 'or') {
      stateConfig = oregon;
    } else if (state === 'ri') {
      stateConfig = rhodeIsland;
    } else if (state === 'vt') {
      stateConfig = vermont;
    } else if (state === 'va') {
      stateConfig = virginia;
    } else if (state === 'wv') {
      stateConfig = westVirginia;
    } else if (state === 'wi') {
      stateConfig = wisconsin;
    }
    if (stateConfig) {
      this.processStateWithholdingRequest(req, res, stateConfig);
    } else {
      res.status(404).send(`State withholding form not located for the state ${state}`);
    }
  }

  processStateWithholdingRequest(req: any, res: any, stateConfig: any) {
    let date = new Date();
    if (req.method === 'GET') {
      if (req.query.hasOwnProperty('date')) {
        date = new Date(req.query.date);
      }
    } else if (req.method === 'POST') {
      if (req.body.hasOwnProperty('date')) {
        date = new Date(req.body.date);
      }
    }

    // Get the correct form based on dates
    const form = utils.getStateWithholdingForm(stateConfig.forms, date);
    if (form === null) {
      res.status(404).send(`State withholding form not located for the selected date`);
      return;
    }

    let data = null;
    // Validate data inputs
    if (req.method === 'GET') {
      if (req.query.hasOwnProperty('demo')) {
        data = form.demo;
      }
    } else if (req.method === 'POST') {
      // Validate the data inputs
      data = req.body;
      const errors = utils.validateFields(form.fields, data);
      if (errors) {
        res.status(500).send(JSON.stringify(errors));
        return;
      }
    }

    // If there is no data and the request hasn't been exited for validation errors then we only need to serve up the raw file without modifications
    if (data === null) {
      const pdf = fs.readFileSync(`${__dirname}/../../documents/${form.file}`);
      res.contentType('application/pdf');
      res.send(pdf);
      return;
    }

    // At this point we have the data validated and the file ready to serve
    const pdfWriter = hummus.createWriterToModify(
      new hummus.PDFRStreamForFile(`${__dirname}/../../documents/${form.file}`),
      new hummus.PDFStreamForResponse(res)
    );

    // Define the fonts to be used
    const crimsonTextFont = pdfWriter.getFontForFile(`${__dirname}/../../fonts/CrimsonText-Regular.ttf`);
    const signatureFont = pdfWriter.getFontForFile(`${__dirname}/../../fonts/Damion-Regular.ttf`);

    const pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);
    // Run the layout function on the form to generate the form
    form.layout(pageModifier.startContext().getContext(), { signature: signatureFont, standard: crimsonTextFont }, data);

    // Write out the form
    pageModifier.endContext().writePage();
    pdfWriter.end();
  }

}
