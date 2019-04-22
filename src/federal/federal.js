function generateFederalForm(formName, data, res) {
    let federalTaxForm;
    if (formName === 'i9') {
        federalTaxForm = require('./i9');
    } else if (formName === 'w4') {
        federalTaxForm = require('./w4');
    }
    if (federalTaxForm) {
        federalTaxForm(data, res);
    } else {
        res.status(404).send(`Could not locate the federal form ${formName}`);
    }
}

module.exports = generateFederalForm;