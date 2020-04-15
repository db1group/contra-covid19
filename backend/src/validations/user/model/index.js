const validationSchema = require("./validation-schema");

const ValidateModel = (request) => {
    const validationResult = validationSchema.validate(request);
    return validationResult;
}

module.exports = { ValidateModel };