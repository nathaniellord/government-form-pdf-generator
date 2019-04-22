var hummus = require('hummus');
var moment = require('moment');

function generatePdf(data, res) {
    /** here we will place the pdf building code **/
    var data = {
        firstName: 'John',
        middleInitial: 'M',
        lastName: 'Doe',
        ssn: '123456789',
        address: '123 Some Really Long Street',
        city: 'Montgomery',
        state: 'AR',
        zip: '36104',
        maritalStatus: 'O',
        wageLetter: 'A',
        allowances: 1,
        additional: 100,
        exempt: true,
        date: '03/28/2019',
    }

    var pdfWriter = hummus.createWriterToModify(
        new hummus.PDFRStreamForFile(__dirname + '/../../documents/NJ-2018.pdf'),
        new hummus.PDFStreamForResponse(res)
    );

    var crimsonTextFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/CrimsonText-Regular.ttf');
    var signatureFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/Damion-Regular.ttf');

    var pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);

    const fontColor = 0x000000;

    pageModifier.startContext().getContext()
        .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 40, 707, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.ssn, 40, 730, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.address, 40, 685, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.city, 40, 665, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.state, 240, 665, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.zip, 290, 665, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.date, 410, 535, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
        .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 120, 535, { font: signatureFont, size: 18, colorspace: 'rgb', color: fontColor });

    if (data.maritalStatus === 'S') {
        pageModifier.getContext()
            .writeText('x', 375, 720, { font: crimsonTextFont, size: 20, colorspace: 'rgb', color: fontColor })
    } else if (data.maritalStatus === 'M') {
        pageModifier.getContext()
            .writeText('x', 375, 706, { font: crimsonTextFont, size: 20, colorspace: 'rgb', color: fontColor })
    } else if (data.maritalStatus === 'F') {
        pageModifier.getContext()
            .writeText('x', 375, 692, { font: crimsonTextFont, size: 20, colorspace: 'rgb', color: fontColor })
    } else if (data.maritalStatus === 'H') {
        pageModifier.getContext()
            .writeText('x', 375, 679, { font: crimsonTextFont, size: 20, colorspace: 'rgb', color: fontColor })
    } else if (data.maritalStatus === 'O') {
        pageModifier.getContext()
            .writeText('x', 375, 665, { font: crimsonTextFont, size: 20, colorspace: 'rgb', color: fontColor })
    }



    // Wage Letter
    if (data.wageLetter) {
        pageModifier.getContext()
            .writeText(data.wageLetter, 490, 648, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    }
    // Allowances
    pageModifier.getContext()
        .writeText(data.allowances, 490, 630, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    // Additional Amount
    if (data.additional) {
        pageModifier.getContext()
            .writeText(data.additional, 490, 610, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    }

    // Exempt
    if (data.exempt) {
        pageModifier.getContext()
            .writeText('EXEMPT', 490, 586, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    }
    pageModifier.endContext().writePage();
    pdfWriter.end();
}
module.exports = generatePdf;