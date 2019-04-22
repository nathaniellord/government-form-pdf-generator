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
    additionalAllowances: 3,
    allowances: 4,
    additional: 100,
    exempt: true,
    exemptMilitary: false,
    date: '03/28/2019',
  }

  var pdfWriter = hummus.createWriterToModify(
    new hummus.PDFRStreamForFile(__dirname + '/../../documents/VA-2011.pdf'),
    new hummus.PDFStreamForResponse(res)
  );

  var crimsonTextFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/CrimsonText-Regular.ttf');
  var signatureFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/Damion-Regular.ttf');

  var pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);

  const fontColor = 0x000000;

  pageModifier.startContext().getContext()
    .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 175, 355, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    .writeText(data.ssn, 40, 355, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    .writeText(data.address, 40, 326, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.city, 40, 297, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.state, 310, 297, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.zip, 445, 297, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.date, 440, 77, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 40, 77, { font: signatureFont, size: 18, colorspace: 'rgb', color: fontColor });

  // Personal Allowances
  utils.centerAlign(pageModifier.getContext(), data.personalAllowances.toString(), 530, 246, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  // Additional Allowances
  utils.centerAlign(pageModifier.getContext(), data.additionalAllowances.toString(), 530, 218, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  // Allowances
  utils.centerAlign(pageModifier.getContext(), data.allowances.toString(), 530, 197, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  // Additional Amount
  if (data.additional) {
    utils.rightAlign(pageModifier.getContext(), data.additional.toString(), 550, 176, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  }

  if (data.exempt) {
    if (data.exemptMilitary) {
      pageModifier.getContext()
        .writeText('x', 486, 97, { font: crimsonTextFont, size: 42, colorspace: 'rgb', color: fontColor })
    } else {
      pageModifier.getContext()
        .writeText('x', 486, 142, { font: crimsonTextFont, size: 40, colorspace: 'rgb', color: fontColor })
    }
  }

  pageModifier.endContext().writePage();
  pdfWriter.end();
}
module.exports = generatePdf;
