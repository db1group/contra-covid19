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
      const mensagem = details.map((detalhe) => {
        const mensagemErro = i18n(detalhe).ptbr[detalhe.type]
        if (mensagemErro)
          return mensagemErro;
        return detalhe.message;
      }).join(",");
      console.log("error", mensagem);
      console.log(details);
      res.status(400).json({ error: mensagem });
    }
  };
};

module.exports = validate;
