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
    maritalStatus: 'W',
    allowances: 1,
    dependents: 3,
    personalAllowance: 1,
    spouseAllowance: 1,
    headOfHousehold: 1,
    additional: 100,
    exempt: true,
    date: '03/28/2019',
  }

  withholdingStatuses = [
    { id: 'J', name: 'Civil Union Filing Seperately' },
    { id: 'C', name: 'Civil Union Filing Jointly' },
    { id: 'M', name: 'Married Filing Jointly' },
    { id: 'F', name: 'Married Filing Separately' },
    { id: 'S', name: 'Single' },
  ];

  var pdfWriter = hummus.createWriterToModify(
    new hummus.PDFRStreamForFile(__dirname + '/../../documents/VT-2018.pdf'),
    new hummus.PDFStreamForResponse(res)
  );

  var crimsonTextFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/CrimsonText-Regular.ttf');
  var signatureFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/Damion-Regular.ttf');

  var pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);

  const fontColor = 0x000000;

  pageModifier.startContext().getContext()
    .writeText(data.firstName, 230, 638, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    .writeText(data.middleInitial, 389, 638, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    .writeText(data.lastName, 40, 638, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    .writeText(data.ssn, 420, 638, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    .writeText(data.date, 365, 90, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 48, 90, { font: signatureFont, size: 18, colorspace: 'rgb', color: fontColor });

  if (data.maritalStatus === 'S') {
    pageModifier.getContext()
      .writeText('x', 72, 601, { font: crimsonTextFont, size: 38, colorspace: 'rgb', color: fontColor })
  } else if (data.maritalStatus === 'M') {
    pageModifier.getContext()
      .writeText('x', 150, 601, { font: crimsonTextFont, size: 38, colorspace: 'rgb', color: fontColor })
  } else if (data.maritalStatus === 'F') {
    pageModifier.getContext()
      .writeText('x', 290, 601, { font: crimsonTextFont, size: 38, colorspace: 'rgb', color: fontColor })
  } else if (data.maritalStatus === 'W') {
    pageModifier.getContext()
      .writeText('x', 431, 601, { font: crimsonTextFont, size: 38, colorspace: 'rgb', color: fontColor })
  }

  let total = 0;
  // Personal Allowances
  if (data.hasOwnProperty('personalAllowance')) {
    total += data.personalAllowance;
    pageModifier.getContext()
      .writeText(data.personalAllowance, 465, 540, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
  }
  // Spouse Allowances
  if (data.hasOwnProperty('spouseAllowance')) {
    total += data.spouseAllowance;
    pageModifier.getContext()
      .writeText(data.spouseAllowance, 465, 518, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
  }
  // Dependents
  if (data.hasOwnProperty('dependents')) {
    total += data.dependents;
    pageModifier.getContext()
      .writeText(data.dependents, 465, 482, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
  }
  // Head of Household
  if (data.hasOwnProperty('headOfHousehold')) {
    total += data.headOfHousehold;
    pageModifier.getContext()
      .writeText(data.headOfHousehold, 465, 460, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
  }
  // Allowances
  if (data.hasOwnProperty('allowances')) {
    pageModifier.getContext()
      .writeText(data.allowances, 540, 438, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
  } else {
    pageModifier.getContext()
      .writeText(total, 540, 438, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
  }
  // Additional Amount
  if (data.additional) {
    utils.rightAlign(pageModifier.getContext(), data.additional.toString(), 550, 416, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  }

  if (data.exempt) {
    utils.centerAlign(pageModifier.getContext(), 'EXEMPT', 540, 382, { font: crimsonTextFont, size: 12, colorspace: 'rgb', color: fontColor });
  }

  pageModifier.endContext().writePage();
  pdfWriter.end();
}
module.exports = generatePdf;
