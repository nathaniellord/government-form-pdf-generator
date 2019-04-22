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
    maritalStatus: 'F',
    personalAllowance: 1,
    spouseAllowance: 0,
    dependents: 3,
    additionalAllowances: 2,
    additional: 100,
    exempt: true,
    militarySpouse: false,
    military: false,
    date: '03/28/2019',
  }

  var pdfWriter = hummus.createWriterToModify(
    new hummus.PDFRStreamForFile(__dirname + '/../../documents/OK-2018.pdf'),
    new hummus.PDFStreamForResponse(res)
  );

  var crimsonTextFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/CrimsonText-Regular.ttf');
  var signatureFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/Damion-Regular.ttf');

  var pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);

  const fontColor = 0x000000;

  pageModifier.startContext().getContext()
    .writeText(`${data.firstName} ${data.middleInitial}`, 43, 670, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(`${data.lastName}`, 273, 670, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.ssn, 440, 670, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.address, 43, 633, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.city, 43, 597, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.state, 380, 597, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.zip, 465, 597, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.date, 450, 270, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 40, 270, { font: signatureFont, size: 18, colorspace: 'rgb', color: fontColor });

  if (data.maritalStatus === 'S') {
    pageModifier.getContext()
      .writeText('x', 373, 647, { font: crimsonTextFont, size: 30, colorspace: 'rgb', color: fontColor })
  } else if (data.maritalStatus === 'M') {
    pageModifier.getContext()
      .writeText('x', 437, 647, { font: crimsonTextFont, size: 30, colorspace: 'rgb', color: fontColor })
  } else if (data.maritalStatus === 'F') {
    pageModifier.getContext()
      .writeText('x', 373, 631, { font: crimsonTextFont, size: 30, colorspace: 'rgb', color: fontColor })
  }

  let total = data.personalAllowance;
  // Personal Allowances
  pageModifier.getContext()
    .writeText(data.personalAllowance, 530, 568, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  // Married Allowances
  if (data.spouseAllowance) {
    total += data.spouseAllowance;
    pageModifier.getContext()
      .writeText('x', 245, 550, { font: crimsonTextFont, size: 30, colorspace: 'rgb', color: fontColor })
      .writeText(data.spouseAllowance, 530, 550, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  } else if (data.maritalStatus === 'M' || data.maritalStatus === 'F') {
    pageModifier.getContext()
      .writeText('x', 281, 550, { font: crimsonTextFont, size: 30, colorspace: 'rgb', color: fontColor })
      .writeText(0, 530, 550, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  }
  // Dependents Allowances
  total += data.dependents;
  pageModifier.getContext()
    .writeText(data.dependents, 530, 523, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });

  // Additional Allowances
  if (data.additionalAllowances) {
    total += data.additionalAllowances;
    pageModifier.getContext()
      .writeText(data.additionalAllowances, 530, 495, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
  }
  // Total Allowances
  pageModifier.getContext()
    .writeText(total, 530, 476, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });

  // Additional Amount
  if (data.additional) {
    pageModifier.getContext()
      .writeText(data.additional, 520, 430, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
  }

  if (data.exempt) {
    if (data.militarySpouse) {
      pageModifier.getContext()
        .writeText('Exempt', 510, 358, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    } else if (data.military) {
      pageModifier.getContext()
        .writeText('Exempt', 510, 328, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    } else {
      pageModifier.getContext()
        .writeText('Exempt', 510, 394, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    }
  }

  pageModifier.endContext().writePage();
  pdfWriter.end();
}
module.exports = generatePdf;
