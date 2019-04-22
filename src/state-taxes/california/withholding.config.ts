module.exports = {
  forms: [
    {
      startDate: new Date('2018-1-1'),
      endDate: null,
      file: 'CA-2018.pdf',
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
        { name: 'maritalStatus', required: true, type: 'string' },
        { name: 'worksheetA', required: true, type: 'number' },
        { name: 'worksheetB', required: true, type: 'number' },
        { name: 'additional', required: true, type: 'number' },
        { name: 'exempt', required: true, type: 'boolean' }
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
        maritalStatus: 'h',
        worksheetA: 1,
        worksheetB: 2,
        additional: 100,
        exempt: true,
        date: '03/28/2019'
      },
      layout: function (context: any, fonts: any, data: any) {
        const fontColor = 0x000000;
        context
          .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 45, 665, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          .writeText(data.ssn, 330, 665, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          .writeText(data.address, 45, 640, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          .writeText(`${data.city}, ${data.state} ${data.zip}`, 45, 617, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          .writeText(data.date, 495, 445, { font: fonts.standard, size: 16, colorspace: 'rgb', color: fontColor })
          .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 80, 445, { font: fonts.signature, size: 18, colorspace: 'rgb', color: fontColor });

        if (data.maritalStatus === 's') {
          data.exemptions = 1 + data.children;
          context.writeText('x', 330, 640, { font: fonts.standard, size: 18, colorspace: 'rgb', color: fontColor })
        } else if (data.maritalStatus === 'm') {
          data.exemptions = 2 + data.children;
          context.writeText('x', 330, 628, { font: fonts.standard, size: 18, colorspace: 'rgb', color: fontColor })
        } else if (data.maritalStatus === 'h') {
          data.exemptions = 2 + data.children;
          context.writeText('x', 330, 616, { font: fonts.standard, size: 18, colorspace: 'rgb', color: fontColor })
        }
        // Additional Amount
        if (data.additional) {
          context.writeText('$' + data.additional, 508, 542, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
        }
        // Worksheet A
        context.writeText(data.worksheetA, 380, 595, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor });
        // Worksheet B
        context.writeText(data.worksheetB, 380, 583, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor });

        // Total
        context.writeText(data.worksheetA + data.worksheetB, 515, 574, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor });

        // Exempt
        if (data.exempt) {
          context.writeText('x', 556, 509, { font: fonts.standard, size: 24, colorspace: 'rgb', color: fontColor })
        }
      }
    }
  ]
};
