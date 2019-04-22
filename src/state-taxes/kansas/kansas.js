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
        maritalStatus: 'j',
        allowances: 4,
        additional: 100,
        exempt: false,
        date: '03/28/2019'
    }

    var pdfWriter = hummus.createWriterToModify(
        new hummus.PDFRStreamForFile(__dirname + '/../../documents/KS-2018.pdf'),
        new hummus.PDFStreamForResponse(res)
    );

    var crimsonTextFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/CrimsonText-Regular.ttf');
    var signatureFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/Damion-Regular.ttf');

    var pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);

    const fontColor = 0x000000;

    pageModifier.startContext().getContext()
        .writeText(`${data.firstName} ${data.middleInitial}`, 50, 227, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(`${data.lastName}`, 285, 227, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.ssn, 460, 227, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.address, 50, 200, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(`${data.city}, ${data.state} ${data.zip}`, 50, 175, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.date, 495, 73, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
        .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 90, 73, { font: signatureFont, size: 18, colorspace: 'rgb', color: fontColor });

    if (data.maritalStatus === 's') {
        data.exemptions = 1 + data.children;
        pageModifier.getContext()
            .writeText('x', 413, 184, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
    } else if (data.maritalStatus === 'j') {
        data.exemptions = 2 + data.children;
        pageModifier.getContext()
            .writeText('x', 484, 184, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
    }
    // Allowances
    pageModifier.getContext()
        .writeText(data.allowances, 510, 155, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
    // Additional Amount
    if (data.additional) {
        pageModifier.getContext()
            .writeText(data.additional, 505, 137, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    }

    // Exempt
    if (data.exempt) {
        pageModifier.getContext()
            .writeText('Exempt', 500, 110, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    }
    pageModifier.endContext().writePage();
    pdfWriter.end();
}
module.exports = generatePdf;