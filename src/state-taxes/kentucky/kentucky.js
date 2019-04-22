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
        payrollNumber: '9089-029',
        singleExemption: 1,
        marriedExemption: 2,
        ageExemptions: 4,
        blindExemptions: 8,
        dependents: 2,
        nationalGuard: 1,
        itemizedExemptions: 3,
        additional: 100,
        date: '03/28/2019'
    }

    var pdfWriter = hummus.createWriterToModify(
        new hummus.PDFRStreamForFile(__dirname + '/../../documents/KY-2013.pdf'),
        new hummus.PDFStreamForResponse(res)
    );

    var crimsonTextFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/CrimsonText-Regular.ttf');
    var signatureFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/Damion-Regular.ttf');

    var pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);

    const fontColor = 0x000000;

    pageModifier.startContext().getContext()
        .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 85, 228, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.ssn, 455, 228, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(`${data.address}, ${data.city}, ${data.state} ${data.zip}`, 98, 212, { font: crimsonTextFont, size: 12, colorspace: 'rgb', color: fontColor })
        .writeText(data.date, 40, 21, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
        .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 235, 21, { font: signatureFont, size: 18, colorspace: 'rgb', color: fontColor })
        .writeText(data.payrollNumber, 460, 246, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })


    let total = 0;
    // Single Exemption
    if (data.singleExemption) {
        total += data.singleExemption;
        pageModifier.getContext()
            .writeText(data.singleExemption, 537, 178, { font: crimsonTextFont, size: 12, colorspace: 'rgb', color: fontColor });
    }
    // Married Exemption
    if (data.marriedExemption) {
        total += data.marriedExemption;
        pageModifier.getContext()
            .writeText(data.marriedExemption, 537, 150, { font: crimsonTextFont, size: 12, colorspace: 'rgb', color: fontColor });
    }
    // Age Exemption
    if (data.ageExemptions) {
        total += data.ageExemptions;
        pageModifier.getContext()
            .writeText(data.ageExemptions, 537, 118, { font: crimsonTextFont, size: 12, colorspace: 'rgb', color: fontColor });
    }
    // Blind Exemption
    if (data.blindExemptions) {
        total += data.blindExemptions;
        pageModifier.getContext()
            .writeText(data.blindExemptions, 537, 102, { font: crimsonTextFont, size: 12, colorspace: 'rgb', color: fontColor });
    }
    // Dependents Exemption
    if (data.dependents) {
        total += data.dependents;
        pageModifier.getContext()
            .writeText(data.dependents, 537, 93, { font: crimsonTextFont, size: 12, colorspace: 'rgb', color: fontColor });
    }
    // National Guard Exemption
    if (data.nationalGuard) {
        total += data.nationalGuard;
        pageModifier.getContext()
            .writeText(data.nationalGuard, 537, 85, { font: crimsonTextFont, size: 12, colorspace: 'rgb', color: fontColor });
    }
    // National Guard Exemption
    if (data.itemizedExemptions) {
        total += data.itemizedExemptions;
        pageModifier.getContext()
            .writeText(data.itemizedExemptions, 537, 77, { font: crimsonTextFont, size: 12, colorspace: 'rgb', color: fontColor });
    }

    // Total
    pageModifier.getContext()
        .writeText(total, 537, 64, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });

    // Additional Amount
    if (data.additional) {
        pageModifier.getContext()
            .writeText(data.additional, 510, 54, { font: crimsonTextFont, size: 12, colorspace: 'rgb', color: fontColor })
    }

    pageModifier.endContext().writePage();
    pdfWriter.end();
}
module.exports = generatePdf;