var hummus = require('hummus');

function generatePdf(data, res) {
    /** here we will place the pdf building code **/
    var data = {
        firstName: 'John',
        middleInitial: 'M',
        lastName: 'Doe',
        ssn: '123456789',
        address: '12345 W Some Really Long Street Address Ave.',
        city: 'Montgomery',
        state: 'AR',
        zip: '36104',
        maritalStatus: 'h',
        allowances: 1,
        additional: 100,
        exempt: true,
        exemptReason: 'E',
        date: '03/28/2019'
    }

    var pdfWriter = hummus.createWriterToModify(
        new hummus.PDFRStreamForFile(__dirname + '/../../documents/ME-2016.pdf'),
        new hummus.PDFStreamForResponse(res)
    );

    var crimsonTextFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/CrimsonText-Regular.ttf');
    var signatureFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/Damion-Regular.ttf');

    var pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);

    const fontColor = 0x000000;

    pageModifier.startContext().getContext()
        .writeText(data.firstName, 45, 693, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.middleInitial, 215, 693, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.lastName, 245, 693, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.address, 45, 665, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.city, 45, 637, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.state, 250, 637, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.zip, 295, 637, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.date, 430, 433, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
        .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 125, 433, { font: signatureFont, size: 18, colorspace: 'rgb', color: fontColor });

    // SSN Layout Function
    for (let i = 0; i < data.ssn.length; i++) {
        const letter = data.ssn.charAt(i);
        let left = 420 + (15 * i);
        if (i > 2) {
            left += 13;
        }
        if (i > 4) {
            left += 13;
        }
        pageModifier.getContext()
            .writeText(letter, left, 693, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor });
    }

    if (data.maritalStatus === 's') {
        pageModifier.getContext()
            .writeText('x', 399, 673, { font: crimsonTextFont, size: 20, colorspace: 'rgb', color: fontColor })
    } else if (data.maritalStatus === 'm') {
        pageModifier.getContext()
            .writeText('x', 472, 673, { font: crimsonTextFont, size: 20, colorspace: 'rgb', color: fontColor })
    } else if (data.maritalStatus === 'h') {
        pageModifier.getContext()
            .writeText('x', 399, 653, { font: crimsonTextFont, size: 20, colorspace: 'rgb', color: fontColor })
    }
    // Additional Amount
    if (data.additional) {
        pageModifier.getContext()
            .writeText(data.additional, 508, 601, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    }
    // Allowances
    pageModifier.getContext()
        .writeText(data.allowances, 508, 620, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });

    // Exempt
    if (data.exempt) {
        if (data.exemptReason === 'A') {
            pageModifier.getContext()
                .writeText('x', 546, 558, { font: crimsonTextFont, size: 20, colorspace: 'rgb', color: fontColor });
        } else if (data.exemptReason === 'B') {
            pageModifier.getContext()
                .writeText('x', 546, 539, { font: crimsonTextFont, size: 20, colorspace: 'rgb', color: fontColor });
        } else if (data.exemptReason === 'C') {
            pageModifier.getContext()
                .writeText('x', 546, 520, { font: crimsonTextFont, size: 20, colorspace: 'rgb', color: fontColor });
        } else if (data.exemptReason === 'D') {
            pageModifier.getContext()
                .writeText('x', 546, 501, { font: crimsonTextFont, size: 20, colorspace: 'rgb', color: fontColor });
        } else if (data.exemptReason === 'E') {
            pageModifier.getContext()
                .writeText('x', 546, 482, { font: crimsonTextFont, size: 20, colorspace: 'rgb', color: fontColor });
        }
    }
    pageModifier.endContext().writePage();
    pdfWriter.end();
}
module.exports = generatePdf;