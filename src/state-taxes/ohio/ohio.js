var hummus = require('hummus');

function generatePdf(data, res) {
  /** here we will place the pdf building code **/
  var data = {
    firstName: 'John',
    middleInitial: 'M',
    lastName: 'Doe',
    ssn: '123456789',
    address: '12345 W Some Really Long Street',
    city: 'Montgomery',
    state: 'AR',
    zip: '36104',
    maritalStatus: 'f',
    personalAllowance: 1,
    marriedAllowance: 1,
    dependents: 3,
    additional: 100,
    exempt: false,
    date: '03/28/2019',
    schoolDistrict: 'Some Awesome School District',
    schoolDistrictNumber: '23425',

  }

  var pdfWriter = hummus.createWriterToModify(
    new hummus.PDFRStreamForFile(__dirname + '/../../documents/OH-2007.pdf'),
    new hummus.PDFStreamForResponse(res)
  );

  var crimsonTextFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/CrimsonText-Regular.ttf');
  var signatureFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/Damion-Regular.ttf');

  var pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);

  const fontColor = 0x000000;

  pageModifier.startContext().getContext()
    .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 90, 201, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.ssn, 415, 201, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(`${data.address}, ${data.city}, ${data.state} ${data.zip}`, 140, 183, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.date, 390, 27, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 80, 27, { font: signatureFont, size: 18, colorspace: 'rgb', color: fontColor });

  if (data.schoolDistrict) {
    pageModifier.getContext()
      .writeText(data.schoolDistrict, 165, 165, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  }
  if (data.schoolDistrictNumber) {
    pageModifier.getContext()
      .writeText(data.schoolDistrictNumber, 500, 165, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  }

  // Personal Allowances
  pageModifier.getContext()
    .writeText(data.personalAllowance, 530, 138, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  // Married Allowances
  pageModifier.getContext()
    .writeText(data.marriedAllowance, 530, 120, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  // Dependents
  pageModifier.getContext()
    .writeText(data.dependents, 530, 102, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });

  const total = data.personalAllowance + data.marriedAllowance + data.dependents;
  // Total Allowances
  pageModifier.getContext()
    .writeText(total, 530, 85, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });

  // Additional Amount
  if (data.additional) {
    pageModifier.getContext()
      .writeText(data.additional, 500, 67, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
  }

  pageModifier.endContext().writePage();
  pdfWriter.end();
}
module.exports = generatePdf;
