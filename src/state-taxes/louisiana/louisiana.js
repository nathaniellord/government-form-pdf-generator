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
        maritalStatus: 'm',
        dependents: 2,
        additional: 100,
        date: '03/28/2019'
    }

    var pdfWriter = hummus.createWriterToModify(
        new hummus.PDFRStreamForFile(__dirname + '/../../documents/LA-2011.pdf'),
        new hummus.PDFStreamForResponse(res)
    );

    var crimsonTextFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/CrimsonText-Regular.ttf');
    var signatureFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/Damion-Regular.ttf');

    var pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);

    const fontColor = 0x000000;

    pageModifier.startContext().getContext()
        .writeText(`${data.firstName} ${data.middleInitial}`, 40, 292, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(`${data.lastName}`, 310, 292, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.ssn, 40, 266, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.address, 40, 240, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.city, 40, 215, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.state, 365, 215, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.zip, 455, 215, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.date, 470, 93, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
        .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 113, 93, { font: signatureFont, size: 18, colorspace: 'rgb', color: fontColor });

    let exemptions = 0;
    if (data.maritalStatus === 's') {
        exemptions = 1;
        pageModifier.getContext()
            .writeText('x', 312, 267, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
    } else if (data.maritalStatus === 'j') {
        exemptions = 2;
        pageModifier.getContext()
            .writeText('x', 471, 267, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
    } else if (data.maritalStatus === 'm') {
        exemptions = 1;
        pageModifier.getContext()
            .writeText('x', 516, 267, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
    }
    // Exemptions
    pageModifier.getContext()
        .writeText(exemptions, 530, 480, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
        .writeText(exemptions, 500, 195, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor });
    // Dependents
    pageModifier.getContext()
        .writeText(data.dependents, 530, 400, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
        .writeText(data.dependents, 500, 170, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor });
    // Additional Amount
    if (data.additional) {
        pageModifier.getContext()
            .writeText(data.additional, 500, 145, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    }

    pageModifier.endContext().writePage();
    pdfWriter.end();
}
module.exports = generatePdf;