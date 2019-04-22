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
        maritalStatus: 'H',
        allowances: 1,
        additional: 100,
        reduced: 200,
        exempt: true,
        military: false,
        militarySpouse: false,
        date: '03/28/2019',
    }

    var pdfWriter = hummus.createWriterToModify(
        new hummus.PDFRStreamForFile(__dirname + '/../../documents/MO-2018.pdf'),
        new hummus.PDFStreamForResponse(res)
    );

    var crimsonTextFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/CrimsonText-Regular.ttf');
    var signatureFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/Damion-Regular.ttf');

    var pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);

    const fontColor = 0x000000;

    pageModifier.startContext().getContext()
        .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 60, 675, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.address, 60, 654, { font: crimsonTextFont, size: 10, colorspace: 'rgb', color: fontColor })
        .writeText(data.city, 300, 654, { font: crimsonTextFont, size: 10, colorspace: 'rgb', color: fontColor })
        .writeText(data.state, 435, 654, { font: crimsonTextFont, size: 10, colorspace: 'rgb', color: fontColor })
        .writeText(data.zip, 505, 654, { font: crimsonTextFont, size: 10, colorspace: 'rgb', color: fontColor })
        .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 60, 327, { font: signatureFont, size: 18, colorspace: 'rgb', color: fontColor });

    // SSN Layout Function
    for (let i = 0; i < data.ssn.length; i++) {
        const letter = data.ssn.charAt(i);
        let left = 436 + (15 * i);
        pageModifier.getContext()
            .writeText(letter, left, 675, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor });
    }

    // Date Layout Function
    const signDate = moment(data.date, 'MM/DD/YYYY').format('MMDDYYYY');
    for (let i = 0; i < signDate.length; i++) {
        const letter = signDate.charAt(i);
        let left = 465 + (13 * i);
        if (i >= 2) {
            left += 4;
        }
        if (i >= 4) {
            left += 4;
        }
        pageModifier.getContext()
            .writeText(letter, left, 327, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor });
    }

    if (data.maritalStatus === 'S' || data.maritalStatus === 'F') {
        pageModifier.getContext()
            .writeText('x', 90, 621, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    } else if (data.maritalStatus === 'M') {
        pageModifier.getContext()
            .writeText('x', 305, 621, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
    } else if (data.maritalStatus === 'H') {
        pageModifier.getContext()
            .writeText('x', 90, 610, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
    }

    // Additional Amount
    if (data.additional) {
        pageModifier.getContext()
            .writeText(data.additional, 510, 560, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    }
    // Reduced Amount
    if (data.reduced) {
        pageModifier.getContext()
            .writeText(data.reduced, 510, 498, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    }

    // Exempt
    if (data.exempt) {
        let top = 451;
        if (data.militarySpouse) {
            top = 424;
        } else if (data.military) {
            top = 397;
        }
        pageModifier.getContext()
            .writeText('Exempt', 510, 471, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
            .writeText('x', 69, top, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
    }
    pageModifier.endContext().writePage();
    pdfWriter.end();
}
module.exports = generatePdf;