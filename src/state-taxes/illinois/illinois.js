var hummus = require('hummus');

function generatePdf(data, res) {
    /** here we will place the pdf building code **/
    var data = {
        name: 'John Doe',
        ssn: '123456789',
        address: '12345 W Some Really Long Street Address Ave.',
        city: 'Montgomery',
        state: 'AR',
        zip: '36104',
        allowances: 1,
        additionalAllowances: 2,
        additional: 100,
        exempt: true,
        date: '03/28/2019'
    }

    var pdfWriter = hummus.createWriterToModify(
        new hummus.PDFRStreamForFile(__dirname + '/../../documents/IL-2017.pdf'),
        new hummus.PDFStreamForResponse(res)
    );

    var crimsonTextFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/CrimsonText-Regular.ttf');
    var signatureFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/Damion-Regular.ttf');

    var pageModifier = new hummus.PDFPageModifier(pdfWriter, 1);

    const fontColor = 0x000000;

    pageModifier.startContext().getContext()
        .writeText(data.name, 20, 141, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.address, 20, 117, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.city, 20, 92, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.state, 197, 92, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.zip, 235, 92, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.date, 520, 70, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.name, 315, 70, { font: signatureFont, size: 16, colorspace: 'rgb', color: fontColor });

    // SSN Layout Function
    for (let i = 0; i < data.ssn.length; i++) {
        const letter = data.ssn.charAt(i);
        let left = 24 + (20 * i);
        if (i > 2) {
            left += 4;
        }
        if (i > 4) {
            left += 4;
        }
        pageModifier.getContext()
            .writeText(letter, left, 167, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor });
    }

    // Allowances
    pageModifier.getContext()
        .writeText(data.allowances, 550, 158, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
    // Additional Allowances
    pageModifier.getContext()
        .writeText(data.additionalAllowances, 550, 134, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
    // Additional Amount
    if (data.additional) {
        pageModifier.getContext()
            .writeText(data.additional, 540, 110, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    }
    // Exempt
    if (data.exempt) {
        pageModifier.getContext()
            .writeText('x', 272, 56, { font: crimsonTextFont, size: 30, colorspace: 'rgb', color: fontColor })
    }
    pageModifier.endContext().writePage();
    pdfWriter.end();
}
module.exports = generatePdf;