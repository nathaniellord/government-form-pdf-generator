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
    maritalStatus: 'F',
    allowances: 1,
    additional: 100,
    exempt: true,
    exemptCode: 'A',
    date: '03/28/2019',
  }

  var pdfWriter = hummus.createWriterToModify(
    new hummus.PDFRStreamForFile(__dirname + '/../../documents/OR-2019.pdf'),
    new hummus.PDFStreamForResponse(res)
  );

  var crimsonTextFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/CrimsonText-Regular.ttf');
  var signatureFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/Damion-Regular.ttf');

  var pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);

  const fontColor = 0x000000;

  pageModifier.startContext().getContext()
    .writeText(`${data.firstName} ${data.middleInitial}`, 40, 363, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(`${data.lastName}`, 155, 363, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.ssn, 307, 363, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.address, 40, 340, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.city, 307, 340, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.state, 470, 340, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.zip, 500, 340, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.date, 428, 110, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 40, 110, { font: signatureFont, size: 18, colorspace: 'rgb', color: fontColor });

  if (data.maritalStatus === 'S') {
    pageModifier.getContext()
      .writeText('x', 109, 288, { font: crimsonTextFont, size: 28, colorspace: 'rgb', color: fontColor })
  } else if (data.maritalStatus === 'M') {
    pageModifier.getContext()
      .writeText('x', 174, 288, { font: crimsonTextFont, size: 28, colorspace: 'rgb', color: fontColor })
  } else if (data.maritalStatus === 'F') {
    pageModifier.getContext()
      .writeText('x', 239, 288, { font: crimsonTextFont, size: 28, colorspace: 'rgb', color: fontColor })
  }

  // Allowances
  pageModifier.getContext()
    .writeText(data.allowances, 520, 242, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  // Additional Amount
  if (data.additional) {
    utils.rightAlign(pageModifier.getContext(), data.additional.toString(), 550, 218, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  }

  if (data.exempt) {
    pageModifier.getContext()
      .writeText(data.exemptCode, 520, 170, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
      .writeText('Exempt', 500, 158, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
  }

  pageModifier.endContext().writePage();
  pdfWriter.end();
}
module.exports = generatePdf;
