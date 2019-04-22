module.exports = {
    forms: [
        {
            startDate: new Date('2014-3-1'),
            endDate: null,
            file: 'AL-2014.pdf',
            fields: [
                { name: 'date', required: true, type: 'date' },
                { name: 'firstName', required: true, type: 'string' },
                { name: 'middleInitial', required: true, type: 'string' },
                { name: 'lastName', required: true, type: 'string' },
                { name: 'ssn', required: true, type: 'ssn' },
                { name: 'address', required: true, type: 'string' },
                { name: 'city', required: true, type: 'string' },
                { name: 'state', required: true, type: 'string' },
                { name: 'zip', required: true, type: 'zip' },
                { name: 'line1', required: true, type: 'string' },
                { name: 'line2', required: true, type: 'string' },
                { name: 'line3', required: true, type: 'string' },
                { name: 'line4', required: true, type: 'string' },
                { name: 'line5', required: true, type: 'string' },
                { name: 'line6', required: true, type: 'string' },
                { name: 'eName', required: false, type: 'string' },
                { name: 'eIN', required: false, type: 'ein' },
                { name: 'eAddress', required: false, type: 'string' },
                { name: 'eCity', required: false, type: 'string' },
                { name: 'eState', required: false, type: 'string' },
                { name: 'eZip', required: false, type: 'zip' },
            ],
            demo: {
                firstName: 'John',
                middleInitial: 'L',
                lastName: 'Doe',
                ssn: '123-45-6789',
                address: '12345 W Some Really Long Street Address Ave.',
                city: 'Montgomery',
                state: 'AL',
                zip: '36104',
                line1: '0',
                line2: 'S',
                line3: '',
                line4: '1',
                line5: '0',
                line6: '2',
                eName: 'ABC Corp Inc.',
                eIN: '12-34567890',
                eAddress: '123 Somewhere Street',
                eCity: 'Salt Lake City',
                eState: 'UT',
                eZip: '84101',
                date: '03/28/2019'
            },
            layout: function (context: any, fonts: any, data: any) {
                const fontColor = 0x000000;
                context
                    .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 40, 595, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
                    .writeText(data.ssn, 445, 595, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
                    .writeText(data.address, 40, 571, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
                    .writeText(data.city, 325, 571, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
                    .writeText(data.state, 458, 571, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
                    .writeText(data.zip, 505, 571, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
                    .writeText(data.line1, 520, 515, { font: fonts.standard, size: 18, colorspace: 'rgb', color: fontColor })
                    .writeText(data.line2, 520, 490, { font: fonts.standard, size: 18, colorspace: 'rgb', color: fontColor })
                    .writeText(data.line3, 520, 455, { font: fonts.standard, size: 18, colorspace: 'rgb', color: fontColor })
                    .writeText(data.line4, 520, 430, { font: fonts.standard, size: 18, colorspace: 'rgb', color: fontColor })
                    .writeText(data.line5, 520, 405, { font: fonts.standard, size: 18, colorspace: 'rgb', color: fontColor })
                    .writeText(data.line6, 520, 380, { font: fonts.standard, size: 18, colorspace: 'rgb', color: fontColor })
                    .writeText(data.date, 460, 310, { font: fonts.standard, size: 18, colorspace: 'rgb', color: fontColor })
                    .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 150, 310, { font: fonts.signature, size: 18, colorspace: 'rgb', color: fontColor })
                if (data.eName) {
                    context.writeText(data.eName, 40, 262, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
                }
                if (data.eIN) {
                    context.writeText(data.eIN, 445, 262, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
                }
                if (data.eAddress) {
                    context.writeText(data.eAddress, 40, 238, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
                }
                if (data.eCity) {
                    context.writeText(data.eCity, 325, 238, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
                }
                if (data.eState) {
                    context.writeText(data.eState, 458, 238, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
                }
                if (data.eZip) {
                    context.writeText(data.eZip, 505, 238, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
                }
            }
        }
    ]
};