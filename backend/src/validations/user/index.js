const { ValidateRequest } = require("./request");
const ValidateModel = require("./model");


module.exports = UserValidations = {
    ValidarRequest: (req, res, next) => {
        const requestObject = req.body;
        const validationResult = ValidateRequest(requestObject);
        if (!validationResult.error) {
            next();
            return;
        }
        //todo: Tratar o erro antes de enviar
        res.status(400).json(validationResult.error);
    },
    ValidateModel: (model) => {
        return ValidateModel.validate(mode);
    },
}