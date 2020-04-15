const Joi = require('@hapi/joi');

module.exports = validationSchema = Joi.object({

    email: Joi.string()
        .email({ minDomainSegments: 1, tlds: { allow: ['com', 'net'] } })
        .required()
});
