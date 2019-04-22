var hummus = require('hummus');

function generatePdf(data, res) {
    /** here we will place the pdf building code **/
    var data = {
        firstName: 'John',
        middleInitial: 'M',
        lastName: 'Doe',
        ssn: '123-45-6789',
        address: '123 Some Really Long Street',
        city: 'Montgomery',
        state: 'AR',
        zip: '36104',
        gender: 'M',
        maritalStatus: 'S',
        spouseAmount: 1000,
        additional: 100,
        dependents: 3,
        exempt: true,
        date: '03/28/2019',
        selfBlind: true,
        selfAge: true,
        spouseBlind: false,
        spouseAge: false,
    }

    var pdfWriter = hummus.createWriterToModify(
        new hummus.PDFRStreamForFile(__dirname + '/../../documents/MS-2015.pdf'),
        new hummus.PDFStreamForResponse(res)
    );

    var crimsonTextFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/CrimsonText-Regular.ttf');
    var signatureFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/Damion-Regular.ttf');

    var pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);

    const fontColor = 0x000000;

    pageModifier.startContext().getContext()
        .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 250, 726, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.ssn, 480, 726, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.address, 245, 696, { font: crimsonTextFont, size: 10, colorspace: 'rgb', color: fontColor })
        .writeText(data.city, 390, 696, { font: crimsonTextFont, size: 10, colorspace: 'rgb', color: fontColor })
        .writeText(data.state, 496, 696, { font: crimsonTextFont, size: 10, colorspace: 'rgb', color: fontColor })
        .writeText(data.zip, 530, 696, { font: crimsonTextFont, size: 10, colorspace: 'rgb', color: fontColor })
        .writeText(data.date, 440, 245, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
        .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 160, 245, { font: signatureFont, size: 18, colorspace: 'rgb', color: fontColor });

    let total = 0;

    if (data.maritalStatus === 'S') {
        const selfAmount = 6000;
        total += selfAmount;
        pageModifier.getContext()
            .writeText('x', 267, 645, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
            .writeText(selfAmount, 508, 643, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    } else if (data.maritalStatus === 'M') {
        const marriedAmount = 12000;
        total += marriedAmount;
        pageModifier.getContext()
            .writeText('x', 267, 628, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
            .writeText(marriedAmount, 508, 626, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })

    } else if (data.maritalStatus === 'F') {
        const marriedAmount = data.spouseAmount;
        total += marriedAmount;
        pageModifier.getContext()
            .writeText('x', 267, 605, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
            .writeText(marriedAmount, 508, 595, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    } else if (data.maritalStatus === 'H') {
        const headOfHouseholdAmount = 9500;
        total += headOfHouseholdAmount;
        pageModifier.getContext()
            .writeText('x', 267, 579, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
            .writeText(headOfHouseholdAmount, 508, 544, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    }
    // Dependents
    if (data.dependents) {
        const dependentAmount = data.dependents * 1500;
        total += dependentAmount;
        pageModifier.getContext()
            .writeText(data.dependents, 180, 475, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
            .writeText(dependentAmount, 508, 472, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    }
    // Age and Blind Allowances 
    if (data.selfAge || data.selfBlind || data.spouseAge || data.spouseBlind) {
        let ageBlindnessAmount = 0;
        if (data.maritalStatus === 'S' || data.maritalStatus === 'H') {
            if (data.selfAge) {
                ageBlindnessAmount += 1500;
                pageModifier.getContext()
                    .writeText('x', 424, 455, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
            }
            if (data.selfBlind) {
                ageBlindnessAmount += 1500;
                pageModifier.getContext()
                    .writeText('x', 424, 444, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
            }
        } else {
            selfLeft = 383;
            spouseLeft = 325;
            if (data.gender === 'M') {
                selfLeft = 325;
                spouseLeft = 383;
            }
            if (data.selfAge) {
                ageBlindnessAmount += 1500;
                pageModifier.getContext()
                    .writeText('x', selfLeft, 455, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
            }
            if (data.selfBlind) {
                ageBlindnessAmount += 1500;
                pageModifier.getContext()
                    .writeText('x', selfLeft, 444, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
            }
            if (data.spouseAge) {
                ageBlindnessAmount += 1500;
                pageModifier.getContext()
                    .writeText('x', spouseLeft, 455, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
            }
            if (data.spouseBlind) {
                ageBlindnessAmount += 1500;
                pageModifier.getContext()
                    .writeText('x', spouseLeft, 444, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
            }
        }
        total += ageBlindnessAmount;
        pageModifier.getContext()
            .writeText(ageBlindnessAmount, 508, 420, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    }
    // Total
    pageModifier.getContext()
        .writeText(total, 508, 385, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    // Additional Amount
    if (data.additional) {
        pageModifier.getContext()
            .writeText(data.additional, 508, 362, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    }

    // Exempt
    if (data.exempt) {
        pageModifier.getContext()
            .writeText('Exempt', 495, 303, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    }
    pageModifier.endContext().writePage();
    pdfWriter.end();
}
module.exports = generatePdf;