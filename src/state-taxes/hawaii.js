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
        allowances: 1,
        maritalStatus: 'N',
        additional: 100,
        date: '03-30-2019',
        eName: 'Resource Management Inc.',
        eWH: '123456789012',
        eAddress: '510 200 W #100',
        eCity: 'Salt Lake City',
        eState: 'UT',
        eZip: '84101',
    }

    var statuses = [{ id: 'M', name: 'Married Filing Jointly' },
    { id: 'F', name: 'Married Withhold at higher Single Rate' },
    { id: 'S', name: 'Single' },
    { id: 'N', name: 'Nonresident Military Spouse' },
    { id: 'C', name: 'Certified Disabled Person' }]

    var pdfWriter = hummus.createWriterToModify(
        new hummus.PDFRStreamForFile(__dirname + '/../../documents/HI-2018.pdf'),
        new hummus.PDFStreamForResponse(res)
    );

    var crimsonTextFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/CrimsonText-Regular.ttf');
    var signatureFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/Damion-Regular.ttf');

    var pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);

    const fontColor = 0x000000;

    pageModifier.startContext().getContext()
        .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 40, 268, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.ssn, 330, 266, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.address, 40, 243, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(`${data.city}, ${data.state} ${data.zip}`, 40, 218, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.date, 60, 133, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
        .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 360, 133, { font: signatureFont, size: 18, colorspace: 'rgb', color: fontColor });

    if (data.maritalStatus === 'S') {
        pageModifier.getContext().writeText('x', 397, 253, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor });
    } else if (data.maritalStatus === 'M') {
        pageModifier.getContext().writeText('x', 445, 253, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor });
    } else if (data.maritalStatus === 'F') {
        pageModifier.getContext().writeText('x', 397, 242, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor });
    } else if (data.maritalStatus === 'C') {
        pageModifier.getContext().writeText('x', 397, 230, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor });
    } else if (data.maritalStatus === 'N') {
        pageModifier.getContext().writeText('x', 397, 218, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor });
    }

    // Exemptions
    pageModifier.getContext()
        .writeText(data.allowances, 525, 193, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    // Additional Amount
    if (data.additional) {
        pageModifier.getContext()
            .writeText(data.additional, 515, 179, { font: crimsonTextFont, size: 12, colorspace: 'rgb', color: fontColor })
    }

    for (let i = 0; i < data.eWH.length; i++) {
        const letter = data.eWH.charAt(i);
        let left = 426 + (11.5 * i);
        if (i > 2) {
            left += 3.5;
        }
        if (i > 5) {
            left += 3.5;
        }
        if (i > 9) {
            left += 3.5;
        }
        pageModifier.getContext()
            .writeText(letter, left, 97, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
    }

    pageModifier.getContext()
        .writeText(data.eName, 40, 96, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.eAddress, 40, 72, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(`${data.eCity}, ${data.eState} ${data.eZip}`, 330, 72, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })

    pageModifier.endContext().writePage();
    pdfWriter.end();
}
module.exports = generatePdf;