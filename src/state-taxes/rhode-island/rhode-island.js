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
    allowances: 1,
    additional: 100,
    exempt: true,
    exemptMilitary: true,
    date: '03/28/2019',
  }

  var pdfWriter = hummus.createWriterToModify(
    new hummus.PDFRStreamForFile(__dirname + '/../../documents/RI-2019.pdf'),
    new hummus.PDFStreamForResponse(res)
  );

  var crimsonTextFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/CrimsonText-Regular.ttf');
  var signatureFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/Damion-Regular.ttf');

  var pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);

  const fontColor = 0x000000;

  pageModifier.startContext().getContext()
    .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 20, 180, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    .writeText(data.ssn, 20, 63, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    .writeText(data.address, 20, 140, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.city, 20, 100, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.state, 160, 100, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.zip, 220, 100, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.date, 480, 21, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 72, 21, { font: signatureFont, size: 18, colorspace: 'rgb', color: fontColor });

  // Allowances
  utils.centerAlign(pageModifier.getContext(), data.allowances.toString(), 556, 180, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  // Additional Amount
  if (data.additional) {
    utils.rightAlign(pageModifier.getContext(), data.additional.toString(), 580, 151, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  }

  if (data.exempt) {
    let exemptString = 'EXEMPT';
    if (data.exemptMilitary) {
      exemptString = 'EXEMPT-MS';
    }
    utils.centerAlign(pageModifier.getContext(), exemptString, 560, 122, { font: crimsonTextFont, size: 12, colorspace: 'rgb', color: fontColor });
  }

  pageModifier.endContext().writePage();
  pdfWriter.end();
}
module.exports = generatePdf;
