var hummus = require('hummus');

function generatePdf(data, res) {
    /** here we will place the pdf building code **/
    var data = {
        firstName: 'John',
        middleInitial: 'M',
        lastName: 'Doe',
        otherLastNames: 'Brown',
        ssn: '123-45-6789',
        address: '12345 W Some Really Long Street Addres',
        aptNumber: '8976',
        city: 'Montgomery',
        state: 'AR',
        zip: '36104',
        birthDate: '04/19/1973',
        ssn: '123456789',
        email: 'john.doe@yahoo.com',
        phone: '(801) 679-2345',
        date: '03/28/2019',
        citizenshipStatus: 'A',
        registrationNumber: '46826349',
        alienExpiration: '09/12/2019',
        alienNumber: '09238098472',
        i94AdmissionNumber: '34543234',
        passportNumber: '09834782',
        passportCountry: 'Russia',
        preparers: [

        ]
    }

    const filePath = data.preparers.length > 1 ? __dirname + '/../../documents/I9-2017-Additional-Preparers.pdf' : __dirname + '/../../documents/I9-2017.pdf';
    const pdfWriter = hummus.createWriterToModify(
        new hummus.PDFRStreamForFile(filePath),
        new hummus.PDFStreamForResponse(res)
    );

    const crimsonTextFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/CrimsonText-Regular.ttf');
    const signatureFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/Damion-Regular.ttf');

    let pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);

    const fontColor = 0x000000;

    pageModifier.startContext().getContext()
        .writeText(data.firstName, 213, 590, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.middleInitial, 363, 590, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.lastName, 40, 590, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.otherLastNames, 425, 590, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.address, 40, 558, { font: crimsonTextFont, size: 12, colorspace: 'rgb', color: fontColor })
        .writeText(data.aptNumber, 245, 558, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.city, 305, 558, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.state, 455, 558, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.zip, 493, 558, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.birthDate, 40, 523, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.email, 275, 523, { font: crimsonTextFont, size: 12, colorspace: 'rgb', color: fontColor })
        .writeText(data.phone, 445, 523, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.date, 480, 252, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
        .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 120, 252, { font: signatureFont, size: 18, colorspace: 'rgb', color: fontColor });

    // SSN Layout Function
    for (let i = 0; i < data.ssn.length; i++) {
        const letter = data.ssn.charAt(i);
        let left = 154 + (10.2 * i);
        if (i > 2) {
            left += 11;
        }
        if (i > 4) {
            left += 10.2;
        }
        pageModifier.getContext()
            .writeText(letter, left, 523, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor });
    }

    if (data.citizenshipStatus === 'C') {
        pageModifier.getContext()
            .writeText('x', 39, 456, { font: crimsonTextFont, size: 24, colorspace: 'rgb', color: fontColor });
    } else if (data.citizenshipStatus === 'N') {
        pageModifier.getContext()
            .writeText('x', 39, 439, { font: crimsonTextFont, size: 24, colorspace: 'rgb', color: fontColor });
    } else if (data.citizenshipStatus === 'R') {
        pageModifier.getContext()
            .writeText('x', 39, 423, { font: crimsonTextFont, size: 24, colorspace: 'rgb', color: fontColor })
            .writeText(data.registrationNumber, 360, 423, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
    } else if (data.citizenshipStatus === 'A') {
        pageModifier.getContext()
            .writeText('x', 39, 406, { font: crimsonTextFont, size: 24, colorspace: 'rgb', color: fontColor })
            .writeText(data.alienExpiration, 357, 406, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
            .writeText(data.alienNumber, 230, 352, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
            .writeText(data.i94AdmissionNumber, 177, 326, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
            .writeText(data.passportNumber, 165, 300, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
            .writeText(data.passportCountry, 143, 284, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    }

    if (data.preparers.length) {
        pageModifier.getContext()
            .writeText('x', 197, 217, { font: crimsonTextFont, size: 24, colorspace: 'rgb', color: fontColor })

        // Add Preparer
        const preparer = data.preparers[0];
        pageModifier.getContext()
            .writeText(`${preparer.firstName} ${preparer.lastName}`, 40, 156, { font: signatureFont, size: 18, colorspace: 'rgb', color: fontColor })
            .writeText(preparer.date, 417, 156, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
            .writeText(preparer.lastName, 40, 127, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
            .writeText(preparer.firstName, 324, 127, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
            .writeText(preparer.address, 40, 98, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
            .writeText(preparer.city, 297, 98, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
            .writeText(preparer.state, 455, 98, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
            .writeText(preparer.zip, 495, 98, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })

    } else {
        pageModifier.getContext()
            .writeText('x', 39, 217, { font: crimsonTextFont, size: 24, colorspace: 'rgb', color: fontColor })
    }

    pageModifier.endContext().writePage();
    if (data.preparers.length > 1) {
        pageModifier = new hummus.PDFPageModifier(pdfWriter, 1);
        pageModifier.startContext().getContext()
            .writeText(data.lastName, 150, 654, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
            .writeText(data.firstName, 335, 654, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
            .writeText(data.middleInitial, 525, 654, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });

        for (let i = 1; i < data.preparers.length; i++) {
            const preparer = data.preparers[i];
            const yCoordinate = 535 - (i - 1) * 120;
            pageModifier.getContext()
                .writeText(`${preparer.firstName} ${preparer.lastName}`, 40, yCoordinate, { font: signatureFont, size: 18, colorspace: 'rgb', color: fontColor })
                .writeText(preparer.date, 417, yCoordinate, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
                .writeText(preparer.lastName, 40, yCoordinate - 29, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
                .writeText(preparer.firstName, 324, yCoordinate - 29, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
                .writeText(preparer.address, 40, yCoordinate - 58, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
                .writeText(preparer.city, 297, yCoordinate - 58, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
                .writeText(preparer.state, 455, yCoordinate - 58, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
                .writeText(preparer.zip, 495, yCoordinate - 58, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        }

        pageModifier.endContext().writePage();
    }
    pdfWriter.end();
}
module.exports = generatePdf;