module.exports = {
  forms: [
    {
      startDate: new Date('2019-1-1'),
      endDate: null,
      file: 'CT-2019.pdf',
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
        { name: 'withholdingCode', required: true, type: 'string' },
        { name: 'reduced', required: true, type: 'number' },
        { name: 'exempt', required: true, type: 'boolean' },
        { name: 'additional', required: true, type: 'number' },
        { name: 'residentState', required: true, type: 'string' },
        { name: 'eName', required: false, type: 'string' },
        { name: 'eIN', required: false, type: 'ein' },
        { name: 'eAddress', required: false, type: 'string' },
        { name: 'eCity', required: false, type: 'string' },
        { name: 'eState', required: false, type: 'string' },
        { name: 'eZip', required: false, type: 'zip' },
        { name: 'eContact', required: false, type: 'string' },
        { name: 'ePhone', required: false, type: 'phone' },
        { name: 'hireDate', required: false, type: 'date' },
        { name: 'newHire', required: false, type: 'boolean' },
      ],
      demo: {
        firstName: 'John',
        middleInitial: 'M',
        lastName: 'Doe',
        ssn: '123-45-6789',
        address: '12345 W Some Really Long Street Address Ave.',
        city: 'Montgomery',
        state: 'AR',
        zip: '36104',
        withholdingCode: 'A',
        additional: 100,
        reduced: 50,
        exempt: true,
        date: '03/28/2019',
        residentState: 'CA',
        eName: 'ABC Corp Inc.',
        eIN: '12-34567890',
        eAddress: '123 Somewhere Street',
        eCity: 'Salt Lake City',
        eState: 'UT',
        eZip: '84101',
        eContact: 'Susan Employer',
        ePhone: '9087562345',
        hireDate: '03/30/2019',
        newHire: false
      },
      layout: function (context: any, fonts: any, data: any) {
        const fontColor = 0x000000;
        context
          .writeText(data.firstName, 45, 280, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          .writeText(data.middleInitial, 215, 280, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          .writeText(data.lastName, 255, 280, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          .writeText(data.ssn, 400, 280, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          .writeText(data.address, 45, 255, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          .writeText(data.city, 45, 230, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          .writeText(data.state, 215, 230, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          .writeText(data.zip, 290, 230, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          .writeText(data.date, 400, 177, { font: fonts.standard, size: 16, colorspace: 'rgb', color: fontColor })
          .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 45, 177, { font: fonts.signature, size: 18, colorspace: 'rgb', color: fontColor });

        // Withholding Code
        context.writeText(data.withholdingCode, 390, 349, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor });

        // Additional Amount
        if (data.additional) {
          context
            .writeText(data.additional, 380, 330, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
        }
        // Reduced Amount
        if (data.reduced) {
          context
            .writeText(data.additional, 380, 311, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
        }

        // Exempt
        if (data.exempt) {
          context
            .writeText('x', 466, 344, { font: fonts.standard, size: 24, colorspace: 'rgb', color: fontColor })
            .writeText(data.residentState, 485, 309, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
        }
        var xCoordinate = 199;
        if (data.newHire) {
          xCoordinate = 248;
        }
        context
          .writeText('x', xCoordinate, 145, { font: fonts.standard, size: 20, colorspace: 'rgb', color: fontColor })
          .writeText(data.hireDate, 375, 147, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          .writeText(data.eName, 45, 110, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          .writeText(data.eIN, 400, 110, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          .writeText(data.eAddress, 45, 86, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          .writeText(data.eCity, 45, 62, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          .writeText(data.eState, 215, 62, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          .writeText(data.eZip, 290, 62, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          .writeText(data.eContact, 45, 39, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          .writeText(`${data.ePhone.substring(0, 3)}`, 410, 39, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          .writeText(`${data.ePhone.substring(3, 6)}-${data.ePhone.substring(6, 11)}`, 440, 39, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
      }
    }
  ]
};
