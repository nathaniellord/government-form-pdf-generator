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

module.exports = {
  rightAlign: rightAlign,
  centerAlign: centerAlign,
  leftAlignWithSpacing: layoutCharacters,
  rightAlignWithSpacing: layoutCharactersRightAlign
};
