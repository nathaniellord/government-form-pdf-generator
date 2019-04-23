const utils = require('../../utils');

module.exports = {
  forms: [
    {
      startDate: new Date('2018-1-1'),
      endDate: null,
      file: 'DC-2018.pdf',
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
        { name: 'allowances', required: true, type: 'number' },
        { name: 'sectionA', required: true, type: 'number' },
        { name: 'sectionB', required: true, type: 'number' },
        { name: 'additional', required: true, type: 'number' },
        { name: 'exempt', required: true, type: 'boolean' },
        { name: 'residentState', required: true, type: 'string' },
        { name: 'student', required: true, type: 'boolean' },
      ],
      demo: {
        firstName: 'John',
        middleInitial: 'M',
        lastName: 'Doe',
        ssn: '123456789',
        address: '12345 Some Really Long Street Drive',
        city: 'Montgomery',
        state: 'AR',
        zip: '36104',
        maritalStatus: 'F',
        allowances: 13,
        sectionA: 5,
        sectionB: 6,
        additional: 100,
        date: '03/28/2019',
        exempt: true,
        residentState: '',
        student: false
      },
      layout: function (context: any, fonts: any, data: any) {
        const fontColor = 0x000000;
        context
          .writeText(data.middleInitial, 292, 716, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          .writeText(data.date, 270, 462, { font: fonts.standard, size: 16, colorspace: 'rgb', color: fontColor })
          .writeText(`${data.firstName} ${data.middleInitial} ${data.lastName}`, 80, 462, { font: fonts.signature, size: 18, colorspace: 'rgb', color: fontColor });

        // SSN
        utils.leftAlignWithSpacing(context, data.ssn, 81, 742, 14.3,
          { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor },
          [
            { position: 3, space: 3 },
            { position: 5, space: 1 },
          ]);
        // First Name
        utils.leftAlignWithSpacing(context, data.firstName.substring(0, 15), 82, 716, 14.1,
          { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor });
        // Last Name
        utils.leftAlignWithSpacing(context, data.lastName.substring(0, 20), 317, 716, 14.1,
          { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor });
        // Address
        utils.leftAlignWithSpacing(context, data.address.substring(0, 30), 82, 689, 14.0,
          { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor });
        // City
        utils.leftAlignWithSpacing(context, data.city.substring(0, 20), 82, 665, 14.1,
          { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor });
        // State
        utils.leftAlignWithSpacing(context, data.state.toUpperCase(), 377, 665, 14.0,
          { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor });
        // Zip
        utils.leftAlignWithSpacing(context, data.zip.toUpperCase().substring(0, 5), 418, 665, 14,
          { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor });

        // Section A Allowances
        if (data.sectionA) {
          utils.rightAlignWithSpacing(context, data.sectionA.toString(), 249, 601, 13,
            { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor });
        }
        // Section B Allowances
        if (data.sectionB) {
          utils.rightAlignWithSpacing(context, data.sectionB.toString(), 405, 601, 13,
            { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor });
        }
        // Allowances
        utils.rightAlignWithSpacing(context, data.allowances.toString(), 620, 602, 13,
          { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor });

        // Additional Amount
        if (data.additional) {
          context
            .writeText(data.additional, 395, 583, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
        }

        if (data.maritalStatus === 'S') {
          context
            .writeText('x', 223.3, 645, { font: fonts.standard, size: 16, colorspace: 'rgb', color: fontColor })
        } else if (data.maritalStatus === 'M' || data.maritalStatus === 'Q') {
          context
            .writeText('x', 275, 645, { font: fonts.standard, size: 16, colorspace: 'rgb', color: fontColor })
        } else if (data.maritalStatus === 'H') {
          context
            .writeText('x', 97.5, 629, { font: fonts.standard, size: 16, colorspace: 'rgb', color: fontColor })
        } else if (data.maritalStatus === 'X') {
          context
            .writeText('x', 224, 629, { font: fonts.standard, size: 16, colorspace: 'rgb', color: fontColor })
        } else if (data.maritalStatus === 'F') {
          context
            .writeText('x', 364, 629, { font: fonts.standard, size: 16, colorspace: 'rgb', color: fontColor })
        }

        if (data.exempt) {
          context
            .writeText('EXEMPT', 485, 566, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          if (data.residentState && data.residentState.length) {
            context
              .writeText('x', 319, 550, { font: fonts.standard, size: 16, colorspace: 'rgb', color: fontColor })
              .writeText(data.residentState, 525, 550, { font: fonts.standard, size: 14, colorspace: 'rgb', color: fontColor })
          } else {
            context
              .writeText('x', 355, 550, { font: fonts.standard, size: 16, colorspace: 'rgb', color: fontColor })
          }
          if (data.student) {
            context
              .writeText('x', 362, 510, { font: fonts.standard, size: 16, colorspace: 'rgb', color: fontColor })
          } else {
            context
              .writeText('x', 396, 510, { font: fonts.standard, size: 16, colorspace: 'rgb', color: fontColor })
          }
        }
      }
    }
  ]
};
