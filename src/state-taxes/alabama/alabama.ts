import hummus from 'hummus';
const stateConfig = require('./withholding.config');
const utils = require('../../utils');
const fs = require('fs');

function generatePdf(req: any, res: any) {
  /** here we will place the pdf building code **/
  let date = new Date();
  if (req.method === 'GET') {
    if (req.query.hasOwnProperty('date')) {
      date = new Date(req.query.date);
    }
    if (req.query.hasOwnProperty('demo')) {
      console.log('Demo data');
    } else {

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
    const errors = null;
    if (errors) {
      res.status(500).send(JSON.stringify(errors));
      return;
    }
  }

  // If there is no data and the request hasn't been exited for validation errors then we only need to serve up the raw file without modifications
  if (data === null) {
    const pdf = fs.readFileSync(`${__dirname}/../../../documents/${form.file}`);
    res.contentType('application/pdf');
    res.send(pdf);
    return;
  }

  // At this point we have the data validated and the file ready to serve
  const pdfWriter = hummus.createWriterToModify(
    new hummus.PDFRStreamForFile(`${__dirname}/../../../documents/${form.file}`),
    new hummus.PDFStreamForResponse(res)
  );

  const crimsonTextFont = pdfWriter.getFontForFile(`${__dirname}/../../../fonts/CrimsonText-Regular.ttf`);
  const signatureFont = pdfWriter.getFontForFile(`${__dirname}/../../../fonts/Damion-Regular.ttf`);
  const fontColor = 0x000000;

  const pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);

  pageModifier.startContext().getContext()
    .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 40, 595, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.ssn, 445, 595, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.address, 40, 571, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.city, 325, 571, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.state, 458, 571, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.zip, 505, 571, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.line1, 520, 515, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
    .writeText(data.line2, 520, 490, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
    .writeText(data.line3, 520, 455, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
    .writeText(data.line4, 520, 430, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
    .writeText(data.line5, 520, 405, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
    .writeText(data.line6, 520, 380, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
    .writeText(data.date, 460, 310, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
    .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 150, 310, { font: signatureFont, size: 18, colorspace: 'rgb', color: fontColor })
    .writeText(data.eName, 40, 262, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.eIN, 445, 262, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.eAddress, 40, 238, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.eCity, 325, 238, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.eState, 458, 238, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.eZip, 505, 238, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })

  pageModifier.endContext().writePage();
  pdfWriter.end();
}
module.exports = generatePdf;
