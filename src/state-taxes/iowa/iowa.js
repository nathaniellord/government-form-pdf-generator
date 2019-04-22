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
        maritalStatus: 'm',
        personalAllowances: 1,
        dependents: 2,
        deductions: 3,
        incomeAdjustments: 4,
        dependentCare: 5,
        additional: 100,
        exempt: true,
        residentState: '',
        date: '03/28/2019'
    }

    var pdfWriter = hummus.createWriterToModify(
        new hummus.PDFRStreamForFile(__dirname + '/../../documents/IA-2019.pdf'),
        new hummus.PDFStreamForResponse(res)
    );

    var crimsonTextFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/CrimsonText-Regular.ttf');
    var signatureFont = pdfWriter.getFontForFile(__dirname + '/../../fonts/Damion-Regular.ttf');

    var pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);

    const fontColor = 0x000000;

    pageModifier.startContext().getContext()
        .writeText(data.name, 110, 371, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.ssn, 480, 371, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.address, 105, 353, { font: crimsonTextFont, size: 12, colorspace: 'rgb', color: fontColor })
        .writeText(data.city, 360, 353, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.state, 495, 353, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.zip, 545, 353, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        .writeText(data.date, 100, 83, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
        .writeText(data.name, 115, 100, { font: signatureFont, size: 18, colorspace: 'rgb', color: fontColor });

    if (data.maritalStatus === 's') {
        data.exemptions = 1 + data.children;
        pageModifier.getContext()
            .writeText('x', 263, 386, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    } else if (data.maritalStatus === 'm') {
        data.exemptions = 2 + data.children;
        pageModifier.getContext()
            .writeText('x', 331, 386, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
    }

    let totalAllowances = 0;
    // Personal Allowances
    if (data.personalAllowances) {
        totalAllowances += data.personalAllowances;
        pageModifier.getContext()
            .writeText(data.personalAllowances, 550, 252, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
    }
    // Delendent Allowances
    if (data.dependents) {
        totalAllowances += data.personalAllowances;
        pageModifier.getContext()
            .writeText(data.dependents, 550, 237, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
    }
    // Itemized Deductions Allowances
    if (data.deductions) {
        totalAllowances += data.deductions;
        pageModifier.getContext()
            .writeText(data.deductions, 550, 223, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
    }
    // Income Adjustment Allowances
    if (data.incomeAdjustments) {
        totalAllowances += data.incomeAdjustments;
        pageModifier.getContext()
            .writeText(data.incomeAdjustments, 550, 208, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
    }
    // Child Care Allowances
    if (data.dependentCare) {
        totalAllowances += data.dependentCare;
        pageModifier.getContext()
            .writeText(data.dependentCare, 550, 194, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });
    }
    // Total Allowances
    pageModifier.getContext()
        .writeText(totalAllowances, 550, 180, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor });

    // Additional Amount
    if (data.additional) {
        pageModifier.getContext()
            .writeText('$' + data.additional, 540, 165, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
    }

    // Exempt
    if (data.exempt) {
        if (data.residentState && data.residentState.length) {
            pageModifier.getContext()
                .writeText('x', 582, 295, { font: crimsonTextFont, size: 16, colorspace: 'rgb', color: fontColor })
                .writeText(data.residentState, 510, 282, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })

        } else {
            pageModifier.getContext()
                .writeText('EXEMPT', 545, 323, { font: crimsonTextFont, size: 12, colorspace: 'rgb', color: fontColor })
                .writeText(new Date().getFullYear(), 170, 308, { font: crimsonTextFont, size: 14, colorspace: 'rgb', color: fontColor })
        }

    }
    pageModifier.endContext().writePage();
    pdfWriter.end();
}
module.exports = generatePdf;