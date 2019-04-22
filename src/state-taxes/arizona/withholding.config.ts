module.exports = {
  forms: [
    {
      startDate: new Date('2019-1-1'),
      endDate: null,
      file: 'AZ-2019.pdf',
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
        { name: 'exempt', required: true, type: 'boolean' },
        { name: 'percent', required: true, type: 'number' },
        { name: 'additional', required: true, type: 'number' },
      ],
      demo: {
        firstName: 'John',
        middleInitial: 'M',
        lastName: 'Doe',
        ssn: '123-45-6789',
        address: '12345 W Some Really Long Street Address Ave.',
        city: 'Montgomery',
        state: 'AZ',
        zip: '36104',
        exempt: false,
        percent: 5.1,
        additional: 0,
        date: '03/28/2019'
      },
      layout: function (context: any, fonts: any, data: any) {
        const fontColor = 0x000000;
        context.writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 40, 676, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          .writeText(data.ssn, 435, 676, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          .writeText(data.address, 40, 652, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          .writeText(data.city, 40, 628, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          .writeText(data.state, 400, 628, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          .writeText(data.zip, 437, 628, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          .writeText(data.date, 440, 450, { font: fonts.standard, size: 18, colorspace: 'rgb', color: fontColor })
          .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 40, 450, { font: fonts.signature, size: 18, colorspace: 'rgb', color: fontColor });
        if (data.exempt) {
          context.writeText('x', 37, 528, { font: fonts.standard, size: 20, colorspace: 'rgb', color: fontColor });
        } else {
          context.writeText('x', 37, 588, { font: fonts.standard, size: 20, colorspace: 'rgb', color: fontColor });
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
          context.writeText('x', xCoordinate, 576, { font: fonts.standard, size: 20, colorspace: 'rgb', color: fontColor });
          if (data.additional) {
            context.writeText('x', 66, 551, { font: fonts.standard, size: 20, colorspace: 'rgb', color: fontColor })
              .writeText(data.additional, 500, 553, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          }
        }
      }
    }
  ]
};