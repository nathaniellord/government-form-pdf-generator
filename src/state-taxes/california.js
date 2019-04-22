var hummus = require('hummus');

function generatePdf(data, res) {
    /** here we will place the pdf building code **/
    var data = {
        name: 'John Doe',
        ssn: '123-45-6789',
        address: '12345 W Some Really Long Street Address Ave.',
        city: 'Montgomery',
        state: 'AR',
        zip: '36104',
        maritalStatus: 'h',
        worksheetA: 1,
        worksheetB: 2,
        additional: 100,
        exempt: true,
        date: '03/28/2019'
    }

    var pdfWriter = hummus.createWriterToModify(
        new hummus.PDFRStreamForFile(__dirname + '/../../documents/CA-2018.pdf'),
        new hummus.PDFStreamForResponse(res)
    );

    var crimsonTextFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/CrimsonText-Regular.ttf');
    var signatureFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/Damion-Regular.ttf');

    var pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);

    const fontColor = 0x000000;

    pageModifier.startContext().getContext()
        .writeText(data.name, 45, 665, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.ssn, 330, 665, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.address, 45, 640, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(`${data.city}, ${data.state} ${data.zip}`, 45, 617, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.date, 495, 445, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
        .writeText(data.name, 80, 445, { font: signatureFont, size: 18, colorspace: 'rgb', color: fontColor });

    if (data.maritalStatus === 's') {
        data.exemptions = 1 + data.children;
        pageModifier.getContext()
            .writeText('x', 330, 640, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
    } else if (data.maritalStatus === 'm') {
        data.exemptions = 2 + data.children;
        pageModifier.getContext()
            .writeText('x', 330, 628, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
    } else if (data.maritalStatus === 'h') {
        data.exemptions = 2 + data.children;
        pageModifier.getContext()
            .writeText('x', 330, 616, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
    }
    // Additional Amount
    if (data.additional) {
        pageModifier.getContext()
            .writeText('$' + data.additional, 508, 542, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    }
    // Worksheet A
    pageModifier.getContext()
        .writeText(data.worksheetA, 380, 595, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
    // Worksheet B
    pageModifier.getContext()
        .writeText(data.worksheetB, 380, 583, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });

    // Total
    pageModifier.getContext()
        .writeText(data.worksheetA + data.worksheetB, 515, 574, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });

    // Exempt
    if (data.exempt) {
        pageModifier.getContext()
            .writeText('x', 556, 509, { font: crimsonTextFont, size: 24, colorspace: 'rgb', color: fontColor })
    }
    pageModifier.endContext().writePage();
    pdfWriter.end();
}
module.exports = generatePdf;