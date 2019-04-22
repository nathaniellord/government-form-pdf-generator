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
        maritalStatus: 'F',
        allowances: 1,
        allowancesNYC: 2,
        date: '03/28/2019',
        residentNYC: true,
        residentYonkers: true,
        additional: 100,
        additionalNYC: 20,
        additionalYonkers: 30
    }

    var pdfWriter = hummus.createWriterToModify(
        new hummus.PDFRStreamForFile(__dirname + '/../../documents/NY-2019.pdf'),
        new hummus.PDFStreamForResponse(res)
    );

    var crimsonTextFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/CrimsonText-Regular.ttf');
    var signatureFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/Damion-Regular.ttf');

    var pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);

    const fontColor = 0x000000;

    pageModifier.startContext().getContext()
        .writeText(`${data.firstName} ${data.middleInitial}`, 40, 686, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.lastName, 255, 686, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.ssn, 435, 686, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.address, 40, 663, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.city, 40, 640, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.state, 270, 640, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.zip, 362, 640, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.date, 420, 470, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
        .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 100, 470, { font: signatureFont, size: 18, colorspace: 'rgb', color: fontColor });

    if (data.maritalStatus === 'S') {
        pageModifier.getContext()
            .writeText('x', 516, 673, { font: crimsonTextFont, size: 20, colorspace: 'rgb', color: fontColor })
    } else if (data.maritalStatus === 'M') {
        pageModifier.getContext()
            .writeText('x', 564, 673, { font: crimsonTextFont, size: 20, colorspace: 'rgb', color: fontColor })
    } else if (data.maritalStatus === 'F') {
        pageModifier.getContext()
            .writeText('x', 564, 661, { font: crimsonTextFont, size: 20, colorspace: 'rgb', color: fontColor })
    }

    if (data.residentNYC) {
        pageModifier.getContext()
            .writeText('x', 237, 625, { font: crimsonTextFont, size: 20, colorspace: 'rgb', color: fontColor })
    } else {
        pageModifier.getContext()
            .writeText('x', 298, 625, { font: crimsonTextFont, size: 20, colorspace: 'rgb', color: fontColor })
    }
    if (data.residentYonkers) {
        pageModifier.getContext()
            .writeText('x', 237, 613, { font: crimsonTextFont, size: 20, colorspace: 'rgb', color: fontColor })
    } else {
        pageModifier.getContext()
            .writeText('x', 298, 613, { font: crimsonTextFont, size: 20, colorspace: 'rgb', color: fontColor })
    }

    // Allowances
    pageModifier.getContext()
        .writeText(data.allowances, 530, 589, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    // NYC Allowances
    if (data.allowancesNYC) {
        pageModifier.getContext()
            .writeText(data.allowancesNYC, 530, 577, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    }
    // NY State Additional Amount
    if (data.additional) {
        pageModifier.getContext()
            .writeText(data.additional, 520, 541, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    }
    // NYC Additional Amount
    if (data.additionalNYC) {
        pageModifier.getContext()
            .writeText(data.additionalNYC, 520, 529, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    }
    // Yonkers Additional Amount
    if (data.additionalYonkers) {
        pageModifier.getContext()
            .writeText(data.additionalYonkers, 520, 517, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    }

    pageModifier.endContext().writePage();
    pdfWriter.end();
}
module.exports = generatePdf;