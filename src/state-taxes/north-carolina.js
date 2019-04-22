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
    maritalStatus: 'H',
    county: 'Lackawanna',
    allowances: 13,
    additional: 100,
    date: '03/28/2019',
    country: ''
  }

  var pdfWriter = hummus.createWriterToModify(
    new hummus.PDFRStreamForFile(__dirname + '/../../documents/NC-2018.pdf'),
    new hummus.PDFStreamForResponse(res)
  );

  var crimsonTextFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/CrimsonText-Regular.ttf');
  var signatureFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/Damion-Regular.ttf');

  var pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);

  const fontColor = 0x000000;

  pageModifier.startContext().getContext()
    .writeText(data.middleInitial, 275, 123, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.date, 460, 38, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
    .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 110, 38, { font: signatureFont, size: 18, colorspace: 'rgb', color: fontColor });

  // SSN
  utils.leftAlignWithSpacing(pageModifier.getContext(), data.ssn, 40, 150, 16.3,
    { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor },
    [
      { position: 3, space: 10 },
      { position: 5, space: 10 },
    ]);
  // First Name
  utils.leftAlignWithSpacing(pageModifier.getContext(), data.firstName.toUpperCase().substring(0, 18), 41, 123, 11.9,
    { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  // Last Name
  utils.leftAlignWithSpacing(pageModifier.getContext(), data.lastName.toUpperCase().substring(0, 22), 318, 123, 11.9,
    { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  // Address
  utils.leftAlignWithSpacing(pageModifier.getContext(), data.address.toUpperCase().substring(0, 37), 41, 96, 11.9,
    { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  // County
  utils.leftAlignWithSpacing(pageModifier.getContext(), data.county.toUpperCase().substring(0, 5), 521, 96, 11.9,
    { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  // City
  utils.leftAlignWithSpacing(pageModifier.getContext(), data.city.toUpperCase().substring(0, 20), 41, 69, 11.9,
    { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  // State
  utils.leftAlignWithSpacing(pageModifier.getContext(), data.state.toUpperCase(), 305, 69, 11.9,
    { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  // Zip
  utils.leftAlignWithSpacing(pageModifier.getContext(), data.zip.toUpperCase().substring(0, 5), 352, 69, 11.9,
    { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  // Country
  utils.leftAlignWithSpacing(pageModifier.getContext(), data.country.toUpperCase().substring(0, 12), 437.5, 69, 11.9,
    { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });

  // Allowances
  utils.rightAlignWithSpacing(pageModifier.getContext(), data.allowances.toString(), 581.5, 205, 11.9,
    { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  // Additional Amount
  if (data.additional) {
    utils.rightAlignWithSpacing(pageModifier.getContext(), data.additional.toString(), 581.5, 183, 11.3,
      { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  }

  if (data.maritalStatus === 'S') {
    pageModifier.getContext()
      .writeText('x', 217.5, 155, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
  } else if (data.maritalStatus === 'M') {
    pageModifier.getContext()
      .writeText('x', 347, 155, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
  } else if (data.maritalStatus === 'H') {
    pageModifier.getContext()
      .writeText('x', 429, 155, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
  }

  pageModifier.endContext().writePage();
  pdfWriter.end();
}
module.exports = generatePdf;
