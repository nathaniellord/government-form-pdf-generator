module.exports = {
  forms: [
    {
      startDate: new Date('2019-1-1'),
      endDate: null,
      file: 'GA-2019.pdf',
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
        { name: 'maritalAllowances', required: true, type: 'number' },
        { name: 'dependents', required: true, type: 'number' },
        { name: 'additionalAllowances', required: true, type: 'number' },
        { name: 'additional', required: true, type: 'number' },
        { name: 'exempt', required: true, type: 'boolean' },
        { name: 'residentState', required: true, type: 'string' },
        { name: 'eIN', required: true, type: 'string' },
        { name: 'eWH', required: true, type: 'string' },
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
      },
      layout: function (context: any, fonts: any, data: any) {
        const fontColor = 0x000000;
        context
          .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 37, 655, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          .writeText(data.ssn, 315, 655, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          .writeText(data.address, 37, 630, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          .writeText(`${data.city}, ${data.state} ${data.zip}`, 315, 630, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          .writeText(data.date, 435, 123, { font: fonts.standard, size: 16, colorspace: 'rgb', color: fontColor })
          .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 130, 123, { font: fonts.signature, size: 18, colorspace: 'rgb', color: fontColor });


        if (!data.exempt) {
          var letter = 'A';
          if (data.maritalStatus === 's') {
            context
              .writeText(data.maritalAllowances, 236, 584, { font: fonts.standard, size: 15, colorspace: 'rgb', color: fontColor })
          } else if (data.maritalStatus === 'm') {
            context
              .writeText(data.maritalAllowances, 236, 562, { font: fonts.standard, size: 15, colorspace: 'rgb', color: fontColor });
            letter = 'B';
          } else if (data.maritalStatus === '1') {
            context
              .writeText(data.maritalAllowances, 236, 540, { font: fonts.standard, size: 15, colorspace: 'rgb', color: fontColor });
            letter = 'C';
          } else if (data.maritalStatus === 'f') {
            context
              .writeText(data.maritalAllowances, 237, 518, { font: fonts.standard, size: 15, colorspace: 'rgb', color: fontColor });
            letter = 'D';
          } else if (data.maritalStatus === 'h') {
            context
              .writeText(data.maritalAllowances, 238, 496, { font: fonts.standard, size: 15, colorspace: 'rgb', color: fontColor });
            letter = 'E';
          }

          // Dependents
          context
            .writeText(data.dependents, 546, 584, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor });
          // Additional Allowances
          context
            .writeText(data.additionalAllowances, 546, 551, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor });
          // Additional Amount
          if (data.additional) {
            context
              .writeText(data.additional, 525, 510, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          }
          // Marital Letter
          context
            .writeText(letter, 260, 256, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor });
          // Total Allowances
          context
            .writeText(data.maritalAllowances + data.dependents + data.additionalAllowances, 530, 256, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor });
        } else {
          if (data.residentState && data.residentState.length) {
            context
              .writeText('x', 476, 177, { font: fonts.standard, size: 16, colorspace: 'rgb', color: fontColor })
              .writeText(data.residentState, 325, 188, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
              .writeText(data.residentState, 130, 177, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          } else {
            context
              .writeText('x', 275, 210, { font: fonts.standard, size: 16, colorspace: 'rgb', color: fontColor })
          }
        }

        context
          .writeText(data.eIN, 385, 87, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          .writeText(data.eWH, 388, 64, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
      }
    }
  ]
};
