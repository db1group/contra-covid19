const Joi = require("@hapi/joi");
const i18n = require("./i18n");
const { ptbr } = i18n;

const validate = (schema, property = "body") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i18n(i).ptbr[i.type]).join(",");
      console.log("error", message);
      console.log(details);
      res.status(400).json({ error: message });
    }
  };
};

module.exports = validate;
