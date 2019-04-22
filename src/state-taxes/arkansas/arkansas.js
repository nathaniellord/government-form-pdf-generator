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
        children: 1,
        exemptions: 0,
        lowIncome: true,
        additional: 100,
        date: '03/28/2019'
    }

    var pdfWriter = hummus.createWriterToModify(
        new hummus.PDFRStreamForFile(__dirname + '/../../documents/AR-2019.pdf'),
        new hummus.PDFStreamForResponse(res)
    );

    var crimsonTextFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/CrimsonText-Regular.ttf');
    var signatureFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/Damion-Regular.ttf');

    var pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);

    const fontColor = 0x000000;

    pageModifier.startContext().getContext()
        .writeText(data.name, 100, 675, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.ssn, 405, 675, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.address, 114, 656, { font: crimsonTextFont, size: 10, colorspace: 'rgb', color: fontColor })
        .writeText(data.city, 335, 656, { font: crimsonTextFont, size: 10, colorspace: 'rgb', color: fontColor })
        .writeText(data.state, 485, 656, { font: crimsonTextFont, size: 10, colorspace: 'rgb', color: fontColor })
        .writeText(data.zip, 525, 656, { font: crimsonTextFont, size: 10, colorspace: 'rgb', color: fontColor })
        .writeText(data.date, 482, 413, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
        .writeText(data.name, 80, 413, { font: signatureFont, size: 18, colorspace: 'rgb', color: fontColor });

    if (data.maritalStatus === 's') {
        data.exemptions = 1 + data.children;
        pageModifier.getContext()
            .writeText('x', 146, 587, { font: crimsonTextFont, size: 24, colorspace: 'rgb', color: fontColor })
            .writeText('1', 520, 588, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
        if (data.lowIncome) {
            pageModifier.getContext()
                .writeText('x', 232, 446, { font: crimsonTextFont, size: 24, colorspace: 'rgb', color: fontColor })
        }
    } else if (data.maritalStatus === 'm') {
        data.exemptions = 2 + data.children;
        pageModifier.getContext()
            .writeText('x', 146, 571, { font: crimsonTextFont, size: 24, colorspace: 'rgb', color: fontColor })
            .writeText('2', 520, 573, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
        if (data.lowIncome) {
            pageModifier.getContext()
                .writeText('x', 277, 446, { font: crimsonTextFont, size: 24, colorspace: 'rgb', color: fontColor })
        }
    } else if (data.maritalStatus === 'h') {
        data.exemptions = 2 + data.children;
        pageModifier.getContext()
            .writeText('x', 146, 556, { font: crimsonTextFont, size: 24, colorspace: 'rgb', color: fontColor })
            .writeText('2', 520, 558, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
        if (data.lowIncome) {
            pageModifier.getContext()
                .writeText('x', 369, 446, { font: crimsonTextFont, size: 24, colorspace: 'rgb', color: fontColor })
        }
    }
    // Additional Amount
    if (data.additional) {
        pageModifier.getContext()
            .writeText('$' + data.additional, 510, 481, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    }
    // Low Income Checkbox
    if (data.lowIncome) {
        pageModifier.getContext()
            .writeText('x', 490, 455, { font: crimsonTextFont, size: 24, colorspace: 'rgb', color: fontColor })
    } else {
        pageModifier.getContext()
            .writeText('x', 535, 455, { font: crimsonTextFont, size: 24, colorspace: 'rgb', color: fontColor })
    }
    // Children
    pageModifier.getContext()
        .writeText(data.children, 520, 535, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    // Total
    pageModifier.getContext()
        .writeText(data.exemptions, 520, 503, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    pageModifier.endContext().writePage();
    pdfWriter.end();
}
module.exports = generatePdf;