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
        residenceCounty: 'Some Awesome County',
        workingCounty: 'Another Awesome County',
        dependents: 2,
        additionalDependents: 1,
        additional: 100,
        additionalCounty: 50,
        selfDeduction: 1,
        spouseDeduction: 1,
        nonResidentAlien: true,
        selfBlind: true,
        selfSenior: true,
        spouseBlind: true,
        spouseSenior: true,
        date: '03/28/2019'
    }

    var pdfWriter = hummus.createWriterToModify(
        new hummus.PDFRStreamForFile(__dirname + '/../../documents/IN-2018.pdf'),
        new hummus.PDFStreamForResponse(res)
    );

    var crimsonTextFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/CrimsonText-Regular.ttf');
    var signatureFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/Damion-Regular.ttf');

    var pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);

    const fontColor = 0x000000;

    pageModifier.startContext().getContext()
        .writeText(data.name, 148, 435, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.ssn, 560, 435, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.address, 160, 413, { font: crimsonTextFont, size: 10, colorspace: 'rgb', color: fontColor })
        .writeText(data.city, 355, 413, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.state, 505, 413, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.zip, 580, 413, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.residenceCounty, 322, 392, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.workingCounty, 367, 371, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.date, 570, 123, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
        .writeText(data.name, 150, 123, { font: signatureFont, size: 18, colorspace: 'rgb', color: fontColor });

    if (data.maritalStatus === 's') {
        data.exemptions = 1 + data.children;
        pageModifier.getContext()
            .writeText('x', 330, 640, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
    } else if (data.maritalStatus === 'm') {
        data.exemptions = 2 + data.children;
        pageModifier.getContext()
            .writeText('x', 330, 628, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
    } else if (data.maritalStatus === 'h') {
        data.exemptions = 2 + data.children;
        pageModifier.getContext()
            .writeText('x', 330, 616, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
    }

    pageModifier.getContext()
        .writeText(data.selfDeduction, 655, 318, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });

    if (!data.nonResidentAlien) {

        // Spouse exemption
        pageModifier.getContext()
            .writeText(data.spouseDeduction, 655, 292, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });

        // Dependents
        if (data.dependents) {
            pageModifier.getContext()
                .writeText(data.dependents, 655, 277, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
        }

        var additionalExemptions = 0;
        if (data.selfSenior) {
            additionalExemptions++;
            pageModifier.getContext()
                .writeText('x', 355, 235, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor });
        }
        if (data.selfBlind) {
            additionalExemptions++;
            pageModifier.getContext()
                .writeText('x', 401, 235, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor });
        }
        if (data.spouseSenior) {
            additionalExemptions++;
            pageModifier.getContext()
                .writeText('x', 502, 235, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor });
        }
        if (data.spouseBlind) {
            additionalExemptions++;
            pageModifier.getContext()
                .writeText('x', 547, 235, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor });
        }
        pageModifier.getContext()
            .writeText(additionalExemptions, 655, 223, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });

        // Total
        pageModifier.getContext()
            .writeText(data.selfDeduction + data.spouseDeduction + data.dependents + additionalExemptions, 655, 203, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });

        // Additional Dependents
        if (data.additionalDependents) {
            pageModifier.getContext()
                .writeText(data.additionalDependents, 655, 189, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
        }
    }

    // Additional Amount
    if (data.additional) {
        pageModifier.getContext()
            .writeText(data.additional, 640, 174, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    }
    // Additional County
    if (data.additionalCounty) {
        pageModifier.getContext()
            .writeText(data.additionalCounty, 640, 159, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    }

    pageModifier.endContext().writePage();
    pdfWriter.end();
}
module.exports = generatePdf;