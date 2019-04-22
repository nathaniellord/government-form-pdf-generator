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
        maritalStatus: '1',
        maritalAllowances: 2,
        dependents: 3,
        additionalAllowances: 2,
        additional: 100,
        exempt: false,
        date: '03/28/2019',
        residentState: '',
        eIN: '7865-238476',
        eWH: '987657658675-WTH'
    }

    var pdfWriter = hummus.createWriterToModify(
        new hummus.PDFRStreamForFile(__dirname + '/../../documents/GA-2019.pdf'),
        new hummus.PDFStreamForResponse(res)
    );

    var crimsonTextFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/CrimsonText-Regular.ttf');
    var signatureFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/Damion-Regular.ttf');

    var pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);

    const fontColor = 0x000000;

    pageModifier.startContext().getContext()
        .writeText(data.name, 37, 655, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.ssn, 315, 655, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.address, 37, 630, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(`${data.city}, ${data.state} ${data.zip}`, 315, 630, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.date, 435, 123, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
        .writeText(data.name, 130, 123, { font: signatureFont, size: 18, colorspace: 'rgb', color: fontColor });


    if (!data.exempt) {
        var letter = 'A';
        if (data.maritalStatus === 's') {
            pageModifier.getContext()
                .writeText(data.maritalAllowances, 236, 584, { font: crimsonTextFont, size: 15, colorspace: 'rgb', color: fontColor })
        } else if (data.maritalStatus === 'm') {
            pageModifier.getContext()
                .writeText(data.maritalAllowances, 236, 562, { font: crimsonTextFont, size: 15, colorspace: 'rgb', color: fontColor });
            letter = 'B';
        } else if (data.maritalStatus === '1') {
            pageModifier.getContext()
                .writeText(data.maritalAllowances, 236, 540, { font: crimsonTextFont, size: 15, colorspace: 'rgb', color: fontColor });
            letter = 'C';
        } else if (data.maritalStatus === 'f') {
            pageModifier.getContext()
                .writeText(data.maritalAllowances, 237, 518, { font: crimsonTextFont, size: 15, colorspace: 'rgb', color: fontColor });
            letter = 'D';
        } else if (data.maritalStatus === 'h') {
            pageModifier.getContext()
                .writeText(data.maritalAllowances, 238, 496, { font: crimsonTextFont, size: 15, colorspace: 'rgb', color: fontColor });
            letter = 'E';
        }

        // Dependents
        pageModifier.getContext()
            .writeText(data.dependents, 546, 584, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
        // Additional Allowances
        pageModifier.getContext()
            .writeText(data.additionalAllowances, 546, 551, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
        // Additional Amount
        if (data.additional) {
            pageModifier.getContext()
                .writeText(data.additional, 525, 510, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        }
        // Marital Letter
        pageModifier.getContext()
            .writeText(letter, 260, 256, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
        // Total Allowances
        pageModifier.getContext()
            .writeText(data.maritalAllowances + data.dependents + data.additionalAllowances, 530, 256, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
    } else {
        if (data.residentState && data.residentState.length) {
            pageModifier.getContext()
                .writeText('x', 476, 177, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
                .writeText(data.residentState, 325, 188, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
                .writeText(data.residentState, 130, 177, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        } else {
            pageModifier.getContext()
                .writeText('x', 275, 210, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
        }
    }

    pageModifier.getContext()
        .writeText(data.eIN, 385, 87, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.eWH, 388, 64, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })

    pageModifier.endContext().writePage();
    pdfWriter.end();
}
module.exports = generatePdf;