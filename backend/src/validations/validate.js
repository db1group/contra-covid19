// const i18n = require('./i18n');

// const validate = (schema, property = 'body') => (req, res, next) => {
//   const { error } = schema.validate(req[property]);
//   const valid = error == null;
//   if (valid) {
//     next();
//   } else {
//     const { details } = error;
//     const mensagem = details.map((d) => i18n(d).ptbr[d.type] || d.message).join(',');
//     res.status(400).json({ error: mensagem });
//   }
// };

// module.exports = validate;
