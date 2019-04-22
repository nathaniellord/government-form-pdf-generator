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
        maritalStatus: 'f',
        differentName: true,
        allowances: 1,
        additional: 100,
        exempt: true,
        date: '03/28/2019',
        eIN: '1234560987',
        eName: 'Resource Management Inc',
        eAddress: '510 200 W #100',
        eCity: 'Salt Lake City',
        eState: 'UT',
        eZip: '84101',
        employmentDate: '02/03/2018'
    }

    var pdfWriter = hummus.createWriterToModify(
        new hummus.PDFRStreamForFile(__dirname + '/../../documents/W4-2019.pdf'),
        new hummus.PDFStreamForResponse(res)
    );

    var crimsonTextFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/CrimsonText-Regular.ttf');
    var signatureFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/Damion-Regular.ttf');

    var pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);

    const fontColor = 0x000000;

    pageModifier.startContext().getContext()
        .writeText(`${data.firstName} ${data.middleInitial}`, 43, 233, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.lastName, 223, 233, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.ssn, 445, 233, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.address, 43, 208, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(`${data.city}, ${data.state} ${data.zip}`, 43, 184, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.date, 480, 78, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
        .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 190, 78, { font: signatureFont, size: 18, colorspace: 'rgb', color: fontColor });

    // Marital Status
    if (data.maritalStatus === 's') {
        pageModifier.getContext()
            .writeText('x', 324, 218, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
    } else if (data.maritalStatus === 'm') {
        pageModifier.getContext()
            .writeText('x', 367, 218, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
    } else if (data.maritalStatus === 'f') {
        pageModifier.getContext()
            .writeText('x', 417, 218, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
    }
    // Different Name
    if (data.differentName) {
        pageModifier.getContext()
            .writeText('x', 565, 184, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
    }
    // Allowances
    pageModifier.getContext()
        .writeText(data.allowances, 530, 170, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    // Additional Amount
    if (data.additional) {
        pageModifier.getContext()
            .writeText(data.additional, 520, 158, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    }
    // Exempt
    if (data.exempt) {
        pageModifier.getContext()
            .writeText('Exempt', 470, 110, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    }

    // Employer Information
    if (data.eIN) {
        pageModifier.getContext()
            .writeText(`${data.eName}`, 43, 50, { font: crimsonTextFont, size: 12, colorspace: 'rgb', color: fontColor })
            .writeText(`${data.eAddress}, ${data.eCity}, ${data.eState} ${data.eZip}`, 43, 39, { font: crimsonTextFont, size: 12, colorspace: 'rgb', color: fontColor })
            .writeText(data.eIN, 475, 45, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
            .writeText(data.employmentDate, 395, 45, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })

    }
    pageModifier.endContext().writePage();
    pdfWriter.end();
}
module.exports = generatePdf;