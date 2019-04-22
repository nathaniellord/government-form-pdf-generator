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
    personalAllowances: 1,
    spouseAllowances: 2,
    dependents: 3,
    allowances: 6,
    lowerRates: true,
    additional: 100,
    date: '03/28/2019',
  }

  var pdfWriter = hummus.createWriterToModify(
    new hummus.PDFRStreamForFile(__dirname + '/../../documents/WV-2018.pdf'),
    new hummus.PDFStreamForResponse(res)
  );

  var crimsonTextFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/CrimsonText-Regular.ttf');
  var signatureFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/Damion-Regular.ttf');

  var pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);

  const fontColor = 0x000000;

  pageModifier.startContext().getContext()
    .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 95, 284, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    .writeText(data.ssn, 370, 284, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    .writeText(data.address, 100, 263, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.city, 87, 241, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.state, 280, 241, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.zip, 397, 241, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.date, 95, 29, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 360, 29, { font: signatureFont, size: 18, colorspace: 'rgb', color: fontColor });

  // Personal Allowances
  utils.centerAlign(pageModifier.getContext(), data.personalAllowances.toString(), 505, 220, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  // Spouse Allowances
  utils.centerAlign(pageModifier.getContext(), data.spouseAllowances.toString(), 505, 178, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  // Dependents
  utils.centerAlign(pageModifier.getContext(), data.dependents.toString(), 505, 152, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  // Allowances
  utils.centerAlign(pageModifier.getContext(), data.allowances.toString(), 510, 134, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  // Lower Rates
  if (data.lowerRates) {
    pageModifier.getContext()
      .writeText('x', 509, 104, { font: crimsonTextFont, size: 26, colorspace: 'rgb', color: fontColor })
  }
  // Additional Amount
  if (data.additional) {
    utils.rightAlign(pageModifier.getContext(), data.additional.toString(), 520, 85, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  }

  pageModifier.endContext().writePage();
  pdfWriter.end();
}
module.exports = generatePdf;
