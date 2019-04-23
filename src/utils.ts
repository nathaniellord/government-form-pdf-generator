function rightAlign(context, string, left, bottom, font) {
  const letterDimensions = font.font.calculateTextDimensions(string, font.size);
  context.writeText(string, left - letterDimensions.width, bottom, font);
}

function centerAlign(context, string, left, bottom, font) {
  const letterDimensions = font.font.calculateTextDimensions(string, font.size);
  context.writeText(string, left - letterDimensions.width / 2, bottom, font);
}

function layoutCharacters(context, string, left, bottom, spacing, font, additionalSpacings) {
  let characterLeft = left - spacing;
  for (let i = 0; i < string.length; i++) {
    characterLeft += spacing;
    const letter = string.charAt(i);
    const letterDimensions = font.font.calculateTextDimensions(letter, font.size);
    if (additionalSpacings && additionalSpacings.length) {
      for (let spacing of additionalSpacings) {
        if (spacing.position === i) {
          characterLeft += spacing.space;
        }
      }
    }
    context.writeText(letter, characterLeft - letterDimensions.width / 2, bottom, font);
  }
}

function layoutCharactersRightAlign(context, string, left, bottom, spacing, font, additionalSpacings) {
  let characterLeft = left - spacing;
  for (let i = string.length - 1; i >= 0; i--) {
    characterLeft -= spacing;
    const letter = string.charAt(i);
    const letterDimensions = font.font.calculateTextDimensions(letter, font.size);
    if (additionalSpacings && additionalSpacings.length) {
      for (let spacing of additionalSpacings) {
        if (spacing.position === i) {
          characterLeft -= spacing.space;
        }
      }
    }
    context.writeText(letter, characterLeft - letterDimensions.width / 2, bottom, font);
  }
}

function getStateWithholdingForm(forms, date) {
  const correctForm = forms.filter(form => {
    if (date > form.startDate) {
      if (form.endDate === null) {
        return true;
      } else if (form.endDate > date) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  });
  if (correctForm.length) {
    return correctForm[0];
  } else {
    return null;
  }
}

function validateFields(fields, body) {
  const errors = [];
  fields.forEach(field => {
    // Do required field validation first
    if (field.required && !body.hasOwnProperty(field.name)) {
      errors.push(`Missing required field '${field.name}'`);
    }
    // Number Validation

    // Date Validation

    // Zip Validation

    // Phone Validation

    // SSN Validation

    // EIN Validation

  });


  if (errors.length) {
    return errors;
  } else {
    return null;
  }
}

module.exports = {
  rightAlign: rightAlign,
  centerAlign: centerAlign,
  leftAlignWithSpacing: layoutCharacters,
  rightAlignWithSpacing: layoutCharactersRightAlign,
  getStateWithholdingForm: getStateWithholdingForm
};
