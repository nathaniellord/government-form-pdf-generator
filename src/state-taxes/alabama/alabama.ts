import hummus from 'hummus';

function generatePdf(req: any, res: any, year: number) {
  /** here we will place the pdf building code **/
  if (req.method === 'GET') {
    if (req.query.hasOwnProperty('demo')) {
      console.log('Demo data');
    } else {

    }
  }

  var data = {
    firstName: 'John',
    middleInitial: 'L',
    lastName: 'Doe',
    ssn: '123-45-6789',
    address: '12345 W Some Really Long Street Address Ave.',
    city: 'Montgomery',
    state: 'AL',
    zip: '36104',
    line1: '0',
    line2: 'S',
    line3: '',
    line4: '1',
    line5: '0',
    line6: '2',
    eName: 'Resource Management Inc.',
    eIN: '12-34567890-841',
    eAddress: '510 200 W #100',
    eCity: 'Salt Lake City',
    eState: 'UT',
    eZip: '84101',
    date: '03/28/2019'
  }

  const pdfWriter = hummus.createWriterToModify(
    new hummus.PDFRStreamForFile(__dirname + '/../../../documents/AL-2014.pdf'),
    new hummus.PDFStreamForResponse(res)
  );

  const crimsonTextFont = pdfWriter.getFontForFile(__dirname + '/../../../fonts/CrimsonText-Regular.ttf');
  const signatureFont = pdfWriter.getFontForFile(__dirname + '/../../../fonts/Damion-Regular.ttf');
  const fontColor = 0x000000;

  const pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);

  pageModifier.startContext().getContext()
    .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 40, 595, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.ssn, 445, 595, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.address, 40, 571, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.city, 325, 571, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.state, 458, 571, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.zip, 505, 571, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.line1, 520, 515, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
    .writeText(data.line2, 520, 490, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
    .writeText(data.line3, 520, 455, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
    .writeText(data.line4, 520, 430, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
    .writeText(data.line5, 520, 405, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
    .writeText(data.line6, 520, 380, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
    .writeText(data.date, 460, 310, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
    .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 150, 310, { font: signatureFont, size: 18, colorspace: 'rgb', color: fontColor })
    .writeText(data.eName, 40, 262, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.eIN, 445, 262, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.eAddress, 40, 238, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.eCity, 325, 238, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.eState, 458, 238, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    .writeText(data.eZip, 505, 238, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })

  pageModifier.endContext().writePage();
  pdfWriter.end();
}
module.exports = generatePdf;
