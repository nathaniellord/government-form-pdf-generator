var hummus = require('hummus');

function generatePdf(data, res) {
    /** here we will place the pdf building code **/
    var data = {
        firstName: 'John',
        middleInitial: 'M',
        lastName: 'Doe',
        ssn: '123-45-6789',
        address: '12345 W Some Really Long Street Address Ave.',
        city: 'Montgomery',
        state: 'AR',
        zip: '36104',
        withholdingCode: 'A',
        additional: 100,
        reduced: 50,
        exempt: true,
        date: '03/28/2019',
        residentState: 'CA',
        eName: 'Resource Management Inc.',
        eIN: '12-34567890-841',
        eAddress: '510 200 W #100',
        eCity: 'Salt Lake City',
        eState: 'UT',
        eZip: '84101',
        eContact: 'Susan Employer',
        ePhone: '9087562345',
        hireDate: '03/30/2019',
        newHire: false
    }

    var pdfWriter = hummus.createWriterToModify(
        new hummus.PDFRStreamForFile(__dirname + '/../../documents/CT-2019.pdf'),
        new hummus.PDFStreamForResponse(res)
    );

    var crimsonTextFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/CrimsonText-Regular.ttf');
    var signatureFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/Damion-Regular.ttf');

    var pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);

    const fontColor = 0x000000;

    pageModifier.startContext().getContext()
        .writeText(data.firstName, 45, 280, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.middleInitial, 215, 280, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.lastName, 255, 280, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.ssn, 400, 280, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.address, 45, 255, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.city, 45, 230, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.state, 215, 230, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.zip, 290, 230, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.date, 400, 177, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
        .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 45, 177, { font: signatureFont, size: 18, colorspace: 'rgb', color: fontColor });

    // Withholding Code
    pageModifier.getContext()
        .writeText(data.withholdingCode, 390, 349, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });

    // Additional Amount
    if (data.additional) {
        pageModifier.getContext()
            .writeText(data.additional, 380, 330, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    }
    // Reduced Amount
    if (data.reduced) {
        pageModifier.getContext()
            .writeText(data.additional, 380, 311, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    }

    // Exempt
    if (data.exempt) {
        pageModifier.getContext()
            .writeText('x', 466, 344, { font: crimsonTextFont, size: 24, colorspace: 'rgb', color: fontColor })
            .writeText(data.residentState, 485, 309, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    }
    var xCoordinate = 199;
    if (data.newHire) {
        xCoordinate = 248;
    }
    pageModifier.getContext()
        .writeText('x', xCoordinate, 145, { font: crimsonTextFont, size: 20, colorspace: 'rgb', color: fontColor })
        .writeText(data.hireDate, 375, 147, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.eName, 45, 110, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.eIN, 400, 110, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.eAddress, 45, 86, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.eCity, 45, 62, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.eState, 215, 62, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.eZip, 290, 62, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.eContact, 45, 39, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(`${data.ePhone.substring(0, 3)}`, 410, 39, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(`${data.ePhone.substring(3, 6)}-${data.ePhone.substring(6, 11)}`, 440, 39, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })

    pageModifier.endContext().writePage();
    pdfWriter.end();
}
module.exports = generatePdf;