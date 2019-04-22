var hummus = require('hummus');

function generatePdf(data, res) {
    /** here we will place the pdf building code **/
    var data = {
        name: 'John Doe',
        ssn: '123-45-6789',
        address: '12345 W Some Really Long Street Address Ave.',
        city: 'Montgomery',
        state: 'AZ',
        zip: '36104',
        exempt: false,
        percent: 5.1,
        additional: 0,
        date: '03/28/2019'
    }

    var pdfWriter = hummus.createWriterToModify(
        new hummus.PDFRStreamForFile(__dirname + '/../../documents/AZ-2019.pdf'),
        new hummus.PDFStreamForResponse(res)
    );

    var crimsonTextFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/CrimsonText-Regular.ttf');
    var signatureFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/Damion-Regular.ttf');

    var pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);

    const fontColor = 0x000000;

    pageModifier.startContext().getContext()
        .writeText(data.name, 40, 676, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.ssn, 435, 676, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.address, 40, 652, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.city, 40, 628, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.state, 400, 628, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.zip, 437, 628, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.date, 440, 450, { font: crimsonTextFont, size: 18, colorspace: 'rgb', color: fontColor })
        .writeText(data.name, 40, 450, { font: signatureFont, size: 18, colorspace: 'rgb', color: fontColor });

    if (data.exempt) {
        pageModifier.getContext()
            .writeText('x', 37, 528, { font: crimsonTextFont, size: 20, colorspace: 'rgb', color: fontColor });
    } else {
        pageModifier.getContext()
            .writeText('x', 37, 588, { font: crimsonTextFont, size: 20, colorspace: 'rgb', color: fontColor });

        var xCoordinate = 66;
        if (data.percent === 1.3) {
            xCoordinate = 138;
        } else if (data.percent === 1.8) {
            xCoordinate = 210;
        } else if (data.percent === 2.7) {
            xCoordinate = 282;
        } else if (data.percent === 3.6) {
            xCoordinate = 354;
        } else if (data.percent === 4.2) {
            xCoordinate = 426;
        } else if (data.percent === 5.1) {
            xCoordinate = 498;
        }
        pageModifier.getContext()
            .writeText('x', xCoordinate, 576, { font: crimsonTextFont, size: 20, colorspace: 'rgb', color: fontColor });

        if (data.additional) {
            pageModifier.getContext()
                .writeText('x', 66, 551, { font: crimsonTextFont, size: 20, colorspace: 'rgb', color: fontColor })
                .writeText(data.additional, 500, 553, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        }
    }

    pageModifier.endContext().writePage();
    pdfWriter.end();
}
module.exports = generatePdf;