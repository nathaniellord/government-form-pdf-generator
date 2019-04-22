module.exports = {
  forms: [
    {
      startDate: new Date('2019-1-1'),
      endDate: null,
      file: 'AR-2019.pdf',
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
        { name: 'childern', required: true, type: 'number' },
        { name: 'lowIncome', required: true, type: 'boolean' },
        { name: 'additional', required: true, type: 'number' },
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
        children: 1,
        exemptions: 0,
        lowIncome: true,
        additional: 100,
        date: '03/28/2019'
      },
      layout: function (context: any, fonts: any, data: any) {
        const fontColor = 0x000000;
        context
          .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 100, 675, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          .writeText(data.ssn, 405, 675, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          .writeText(data.address, 114, 656, { font: fonts.standard, size: 10, colorspace: 'rgb', color: fontColor })
          .writeText(data.city, 335, 656, { font: fonts.standard, size: 10, colorspace: 'rgb', color: fontColor })
          .writeText(data.state, 485, 656, { font: fonts.standard, size: 10, colorspace: 'rgb', color: fontColor })
          .writeText(data.zip, 525, 656, { font: fonts.standard, size: 10, colorspace: 'rgb', color: fontColor })
          .writeText(data.date, 482, 413, { font: fonts.standard, size: 16, colorspace: 'rgb', color: fontColor })
          .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 80, 413, { font: fonts.signature, size: 18, colorspace: 'rgb', color: fontColor });

        if (data.maritalStatus === 's') {
          data.exemptions = 1 + data.children;
          context
            .writeText('x', 146, 587, { font: fonts.standard, size: 24, colorspace: 'rgb', color: fontColor })
            .writeText('1', 520, 588, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor });
          if (data.lowIncome) {
            context
              .writeText('x', 232, 446, { font: fonts.standard, size: 24, colorspace: 'rgb', color: fontColor })
          }
        } else if (data.maritalStatus === 'm') {
          data.exemptions = 2 + data.children;
          context
            .writeText('x', 146, 571, { font: fonts.standard, size: 24, colorspace: 'rgb', color: fontColor })
            .writeText('2', 520, 573, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor });
          if (data.lowIncome) {
            context
              .writeText('x', 277, 446, { font: fonts.standard, size: 24, colorspace: 'rgb', color: fontColor })
          }
        } else if (data.maritalStatus === 'h') {
          data.exemptions = 2 + data.children;
          context
            .writeText('x', 146, 556, { font: fonts.standard, size: 24, colorspace: 'rgb', color: fontColor })
            .writeText('2', 520, 558, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor });
          if (data.lowIncome) {
            context
              .writeText('x', 369, 446, { font: fonts.standard, size: 24, colorspace: 'rgb', color: fontColor })
          }
        }
        // Additional Amount
        if (data.additional) {
          context
            .writeText('$' + data.additional, 510, 481, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
        }
        // Low Income Checkbox
        if (data.lowIncome) {
          context
            .writeText('x', 490, 455, { font: fonts.standard, size: 24, colorspace: 'rgb', color: fontColor })
        } else {
          context
            .writeText('x', 535, 455, { font: fonts.standard, size: 24, colorspace: 'rgb', color: fontColor })
        }
        // Children
        context
          .writeText(data.children, 520, 535, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
        // Total
        context
          .writeText(data.exemptions, 520, 503, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
      }
    }
  ]
};
