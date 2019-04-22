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
        additional: 100,
        dependents: 2,
        exempt: true,
        date: '03/28/2019',
        headOfHousehold: true,
        blindExemption: true,
        spouseBlindExemption: true,
        ageExemption: true,
        spouseAgeExemption: true
    }

    var pdfWriter = hummus.createWriterToModify(
        new hummus.PDFRStreamForFile(__dirname + '/../../documents/MA-2002.pdf'),
        new hummus.PDFStreamForResponse(res)
    );

    var crimsonTextFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/CrimsonText-Regular.ttf');
    var signatureFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/Damion-Regular.ttf');

    var pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);

    const fontColor = 0x000000;

    pageModifier.startContext().getContext()
        .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 100, 622, { font: crimsonTextFont, size: 12, colorspace: 'rgb', color: fontColor })
        .writeText(data.ssn, 385, 622, { font: crimsonTextFont, size: 12, colorspace: 'rgb', color: fontColor })
        .writeText(data.address, 112, 610, { font: crimsonTextFont, size: 10, colorspace: 'rgb', color: fontColor })
        .writeText(data.city, 328, 610, { font: crimsonTextFont, size: 12, colorspace: 'rgb', color: fontColor })
        .writeText(data.state, 437, 610, { font: crimsonTextFont, size: 12, colorspace: 'rgb', color: fontColor })
        .writeText(data.zip, 515, 610, { font: crimsonTextFont, size: 12, colorspace: 'rgb', color: fontColor })
        .writeText(data.date, 60, 423, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
        .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 190, 423, { font: signatureFont, size: 18, colorspace: 'rgb', color: fontColor });

    let total = 0;
    let personalExemptions = 1;
    if (data.ageExemption) {
        personalExemptions++;
    }
    total += personalExemptions;
    // Personal Exemptions
    pageModifier.getContext()
        .writeText(personalExemptions, 552, 575, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    // Married Status Exemptions
    if (data.maritalStatus === 'm') {
        let marriedExemptions = 1;
        if (data.spouseAgeExemption) {
            marriedExemptions++;
        }
        total += marriedExemptions;
        pageModifier.getContext()
            .writeText(marriedExemptions, 552, 550, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    }
    // Dependents
    if (data.dependents) {
        total += data.dependents;
        pageModifier.getContext()
            .writeText(data.dependents, 552, 538, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    }
    // Total Exemptions
    pageModifier.getContext()
        .writeText(total, 552, 524, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    // Additional Amount
    if (data.additional) {
        pageModifier.getContext()
            .writeText(data.additional, 380, 514, { font: crimsonTextFont, size: 12, colorspace: 'rgb', color: fontColor })
    }
    // Head of Household
    if (data.headOfHousehold) {
        pageModifier.getContext()
            .writeText('x', 165, 500, { font: crimsonTextFont, size: 20, colorspace: 'rgb', color: fontColor })
    }
    // Blind Exemption
    if (data.blindExemption) {
        pageModifier.getContext()
            .writeText('x', 165, 488, { font: crimsonTextFont, size: 20, colorspace: 'rgb', color: fontColor })
    }
    // Spouse Blind Exemption
    if (data.spouseBlindExemption) {
        pageModifier.getContext()
            .writeText('x', 288, 488, { font: crimsonTextFont, size: 20, colorspace: 'rgb', color: fontColor })
    }
    // Income Exemption
    if (data.exempt) {
        pageModifier.getContext()
            .writeText('x', 165, 476, { font: crimsonTextFont, size: 20, colorspace: 'rgb', color: fontColor })
    }
    pageModifier.endContext().writePage();
    pdfWriter.end();
}
module.exports = generatePdf;