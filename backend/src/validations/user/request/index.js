const validationSchema = require("./validation-schema");

const ValidateRequest = (request) => {
    const validationResult = validationSchema.validate(request);
    return validationResult;
}

module.exports = { ValidateRequest };