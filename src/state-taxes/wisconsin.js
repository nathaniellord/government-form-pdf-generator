var hummus = require('hummus');
var utils = require('../utils');

function generatePdf(data, res) {
  /** here we will place the pdf building code **/
  var data = {
    firstName: 'John',
    middleInitial: 'M',
    lastName: 'Doe',
    ssn: '123-45-6789',
    address: '12345 W Some Really Long Street',
    city: 'Montgomery',
    state: 'AR',
    zip: '36104',
    date: '03/28/2019',
    maritalStatus: 'S',
    estimatedIncome: 100000,
    standardDeduction: 15000,
    credits: 3000,
    withheld: 10000,
    spouseWithholding: 1200,
  }

  var pdfWriter = hummus.createWriterToModify(
    new hummus.PDFRStreamForFile(__dirname + '/../../documents/WI-2019.pdf'),
    new hummus.PDFStreamForResponse(res)
  );

  var crimsonTextFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/CrimsonText-Regular.ttf');
  var signatureFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/Damion-Regular.ttf');

  var pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);

  const fontColor = 0x000000;

  pageModifier.startContext().getContext()
    .writeText(`${data.firstName} ${data.middleInitial}`, 195, 429, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    .writeText(data.lastName, 30, 429, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    .writeText(data.ssn, 207, 403, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    .writeText(data.address, 30, 378, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(`${data.city}, ${data.state} ${data.zip}`, 30, 353, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.date, 470, 233, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 145, 233, { font: signatureFont, size: 18, colorspace: 'rgb', color: fontColor });

  pageModifier.endContext().writePage();
  pdfWriter.end();
}
module.exports = generatePdf;
