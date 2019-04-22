var hummus = require('hummus');

function generatePdf(data, res) {
    /** here we will place the pdf building code **/
    var data = {
        firstName: 'John',
        middleInitial: 'M',
        lastName: 'Doe',
        ssn: '123456789',
        address: '12345 W Some Really Long Street',
        city: 'Montgomery',
        state: 'AR',
        zip: '36104',
        county: 'Lackawanna',
        maritalStatus: 'f',
        allowances: 2,
        additional: 100,
        exempt: false,
        date: '03/28/2019',
        residentState: 'CA',
        domicileState: 'WV',
        exemptYear: '2019',
        yorkExempt: true,
        paStateExempt: true,
        paLocalExempt: true
    }

    var pdfWriter = hummus.createWriterToModify(
        new hummus.PDFRStreamForFile(__dirname + '/../../documents/MD-2017.pdf'),
        new hummus.PDFStreamForResponse(res)
    );

    var crimsonTextFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/CrimsonText-Regular.ttf');
    var signatureFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/Damion-Regular.ttf');

    var pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);

    const fontColor = 0x000000;

    pageModifier.startContext().getContext()
        .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 40, 322, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.ssn, 310, 322, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(`${data.address}, ${data.city}, ${data.state} ${data.zip}`, 40, 300, { font: crimsonTextFont, size: 10, colorspace: 'rgb', color: fontColor })
        .writeText(data.county, 310, 300, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.date, 400, 60, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
        .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 100, 60, { font: signatureFont, size: 18, colorspace: 'rgb', color: fontColor });

    if (data.maritalStatus === 's') {
        pageModifier.getContext()
            .writeText('x', 48, 285, { font: crimsonTextFont, size: 20, colorspace: 'rgb', color: fontColor })
    } else if (data.maritalStatus === 'm') {
        pageModifier.getContext()
            .writeText('x', 120, 285, { font: crimsonTextFont, size: 20, colorspace: 'rgb', color: fontColor })
    } else if (data.maritalStatus === 'f') {
        pageModifier.getContext()
            .writeText('x', 418, 285, { font: crimsonTextFont, size: 20, colorspace: 'rgb', color: fontColor })
    }
    // Allowances
    pageModifier.getContext()
        .writeText(data.allowances, 540, 273, { font: crimsonTextFont, size: 10, colorspace: 'rgb', color: fontColor });
    // Additional Amount
    if (data.additional) {
        pageModifier.getContext()
            .writeText(`$${data.additional}`, 530, 262, { font: crimsonTextFont, size: 10, colorspace: 'rgb', color: fontColor })
    }


    // Exempt
    if (data.exempt) {
        if (data.residentState && data.residentState.length) {
            pageModifier.getContext()
                .writeText(data.residentState, 220, 116, { font: crimsonTextFont, size: 10, colorspace: 'rgb', color: fontColor })
                .writeText('EXEMPT', 530, 108, { font: crimsonTextFont, size: 10, colorspace: 'rgb', color: fontColor });
        }
        if (data.domicileState && data.domicileState.length) {
            let left;
            if (data.domicileState === 'DC') {
                left = 48;
            } else if (data.domicileState === 'VA') {
                left = 158;
            } else if (data.domicileState === 'WV') {
                left = 241;
            }
            if (left) {
                pageModifier.getContext()
                    .writeText('x', left, 190, { font: crimsonTextFont, size: 20, colorspace: 'rgb', color: fontColor })
                    .writeText('EXEMPT', 530, 183, { font: crimsonTextFont, size: 10, colorspace: 'rgb', color: fontColor });
            }
        }
        if (data.exemptYear && data.exemptYear.length) {
            pageModifier.getContext()
                .writeText('x', 48, 240, { font: crimsonTextFont, size: 20, colorspace: 'rgb', color: fontColor })
                .writeText('x', 48, 229, { font: crimsonTextFont, size: 20, colorspace: 'rgb', color: fontColor })
                .writeText(data.exemptYear, 230, 212, { font: crimsonTextFont, size: 10, colorspace: 'rgb', color: fontColor })
                .writeText('EXEMPT', 530, 213, { font: crimsonTextFont, size: 10, colorspace: 'rgb', color: fontColor });
        }

        if (data.paStateExempt) {
            pageModifier.getContext()
                .writeText('EXEMPT', 530, 164, { font: crimsonTextFont, size: 10, colorspace: 'rgb', color: fontColor });
        }
        if (data.yorkExempt) {
            pageModifier.getContext()
                .writeText('EXEMPT', 530, 145, { font: crimsonTextFont, size: 10, colorspace: 'rgb', color: fontColor });
        }
        if (data.paLocalExempt) {
            pageModifier.getContext()
                .writeText('EXEMPT', 530, 126, { font: crimsonTextFont, size: 10, colorspace: 'rgb', color: fontColor });
        }
    }
    pageModifier.endContext().writePage();
    pdfWriter.end();
}
module.exports = generatePdf;