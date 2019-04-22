var hummus = require('hummus');
var moment = require('moment');
const utils = require('../utils');

function generatePdf(data, res) {
  /** here we will place the pdf building code **/
  var data = {
    firstName: 'John',
    middleInitial: 'M',
    lastName: 'Doe',
    ssn: '123456789',
    address: '12345 Some Really Long Street Drive',
    city: 'Montgomery',
    state: 'AR',
    zip: '36104',
    maritalStatus: 'F',
    allowances: 13,
    sectionA: 5,
    sectionB: 6,
    additional: 100,
    date: '03/28/2019',
    exempt: true,
    residentState: '',
    student: false
  }

  withholdingStatuses = [
    { id: 'S', name: 'Single' },
    { id: 'H', name: 'Head of Household' },
    { id: 'M', name: 'Married/Domestic Partners Filing Jointly' },
    { id: 'X', name: 'Married Filing Separately' },
    { id: 'F', name: 'Married/Domestic Partners Filing Seperately' },
    { id: 'Q', name: 'Surviving Spouse' },
  ];

  var pdfWriter = hummus.createWriterToModify(
    new hummus.PDFRStreamForFile(__dirname + '/../../documents/DC-2018.pdf'),
    new hummus.PDFStreamForResponse(res)
  );

  var crimsonTextFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/CrimsonText-Regular.ttf');
  var signatureFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/Damion-Regular.ttf');

  var pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);

  const fontColor = 0x000000;

  pageModifier.startContext().getContext()
    .writeText(data.middleInitial, 292, 716, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.date, 270, 462, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 80, 462, { font: signatureFont, size: 18, colorspace: 'rgb', color: fontColor });

  // SSN
  utils.leftAlignWithSpacing(pageModifier.getContext(), data.ssn, 81, 742, 14.3,
    { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor },
    [
      { position: 3, space: 3 },
      { position: 5, space: 1 },
    ]);
  // First Name
  utils.leftAlignWithSpacing(pageModifier.getContext(), data.firstName.substring(0, 15), 82, 716, 14.1,
    { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  // Last Name
  utils.leftAlignWithSpacing(pageModifier.getContext(), data.lastName.substring(0, 20), 317, 716, 14.1,
    { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  // Address
  utils.leftAlignWithSpacing(pageModifier.getContext(), data.address.substring(0, 30), 82, 689, 14.0,
    { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  // City
  utils.leftAlignWithSpacing(pageModifier.getContext(), data.city.substring(0, 20), 82, 665, 14.1,
    { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  // State
  utils.leftAlignWithSpacing(pageModifier.getContext(), data.state.toUpperCase(), 377, 665, 14.0,
    { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  // Zip
  utils.leftAlignWithSpacing(pageModifier.getContext(), data.zip.toUpperCase().substring(0, 5), 418, 665, 14,
    { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });

  // Section A Allowances
  if (data.sectionA) {
    utils.rightAlignWithSpacing(pageModifier.getContext(), data.sectionA.toString(), 249, 601, 13,
      { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  }
  // Section B Allowances
  if (data.sectionB) {
    utils.rightAlignWithSpacing(pageModifier.getContext(), data.sectionB.toString(), 405, 601, 13,
      { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  }
  // Allowances
  utils.rightAlignWithSpacing(pageModifier.getContext(), data.allowances.toString(), 620, 602, 13,
    { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });

  // Additional Amount
  if (data.additional) {
    pageModifier.startContext().getContext()
      .writeText(data.additional, 395, 583, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
  }

  if (data.maritalStatus === 'S') {
    pageModifier.getContext()
      .writeText('x', 223.3, 645, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
  } else if (data.maritalStatus === 'M' || data.maritalStatus === 'Q') {
    pageModifier.getContext()
      .writeText('x', 275, 645, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
  } else if (data.maritalStatus === 'H') {
    pageModifier.getContext()
      .writeText('x', 97.5, 629, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
  } else if (data.maritalStatus === 'X') {
    pageModifier.getContext()
      .writeText('x', 224, 629, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
  } else if (data.maritalStatus === 'F') {
    pageModifier.getContext()
      .writeText('x', 364, 629, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
  }

  if (data.exempt) {
    pageModifier.getContext()
      .writeText('EXEMPT', 485, 566, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    if (data.residentState && data.residentState.length) {
      pageModifier.getContext()
        .writeText('x', 319, 550, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
        .writeText(data.residentState, 525, 550, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    } else {
      pageModifier.getContext()
        .writeText('x', 355, 550, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    }
    if (data.student) {
      pageModifier.getContext()
        .writeText('x', 362, 510, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    } else {
      pageModifier.getContext()
        .writeText('x', 396, 510, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    }
  }

  pageModifier.endContext().writePage();
  pdfWriter.end();
}
module.exports = generatePdf;
