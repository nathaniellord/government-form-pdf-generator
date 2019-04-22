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
        birthDate: '10/10/1971',
        stateIdNumber: '582693471',
        hireDate: '',
        additional: 100,
        allowances: 2,
        exempt: true,
        exemptReason: 'I refuse to pay taxes to the man',
        renaissanceZone: 'Zone 3',
        date: '03/28/2019'
    }

    var pdfWriter = hummus.createWriterToModify(
        new hummus.PDFRStreamForFile(__dirname + '/../../documents/MI-2011.pdf'),
        new hummus.PDFStreamForResponse(res)
    );

    var crimsonTextFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/CrimsonText-Regular.ttf');
    var signatureFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/Damion-Regular.ttf');

    var pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);

    const fontColor = 0x000000;

    pageModifier.startContext().getContext()
        .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 45, 667, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.ssn, 335, 691, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.birthDate, 480, 691, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.stateIdNumber, 335, 667, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.address, 45, 643, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.city, 45, 619, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.state, 240, 619, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.zip, 280, 619, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.date, 495, 465, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
        .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 230, 465, { font: signatureFont, size: 18, colorspace: 'rgb', color: fontColor });

    // New Hire
    if (data.hireDate && data.hireDate.length) {
        pageModifier.getContext()
            .writeText('x', 339, 639, { font: crimsonTextFont, size: 28, colorspace: 'rgb', color: fontColor })
            .writeText(data.hireDate, 480, 645, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    } else {
        pageModifier.getContext()
            .writeText('x', 339, 621, { font: crimsonTextFont, size: 28, colorspace: 'rgb', color: fontColor })
    }

    // Allowances
    pageModifier.getContext()
        .writeText(data.allowances, 512, 600, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    // Additional Amount
    if (data.additional) {
        pageModifier.getContext()
            .writeText(data.additional, 508, 578, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    }

    // Exempt
    if (data.exempt) {
        if (data.exemptReason && data.exemptReason.length) {
            pageModifier.getContext()
                .writeText('x', 78, 539, { font: crimsonTextFont, size: 22, colorspace: 'rgb', color: fontColor })
                .writeText(data.exemptReason, 280, 540, { font: crimsonTextFont, size: 12, colorspace: 'rgb', color: fontColor })
        } else if (data.renaissanceZone && data.renaissanceZone.length) {
            pageModifier.getContext()
                .writeText('x', 78, 527, { font: crimsonTextFont, size: 22, colorspace: 'rgb', color: fontColor })
                .writeText(data.renaissanceZone, 395, 529, { font: crimsonTextFont, size: 12, colorspace: 'rgb', color: fontColor })
        } else {
            pageModifier.getContext()
                .writeText('x', 78, 551, { font: crimsonTextFont, size: 22, colorspace: 'rgb', color: fontColor })
        }
    }
    pageModifier.endContext().writePage();
    pdfWriter.end();
}
module.exports = generatePdf;