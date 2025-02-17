    const Joi = require("joi")

    exports.signupSchema=Joi.object({
        email:Joi.string().min(6).max(60).required().email({
            tlds:{allow:['com','net']}
        }),
            password: Joi.string()
        .min(8)
        .max(32)
        .required()
        .pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
    })

    exports.signinSchema=Joi.object({
        email:Joi.string().min(6).max(60).required().email({
            tlds:{allow:['com','net']}
        }),
            password: Joi.string()
        .min(8)
        .max(32)
        .required()
        .pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
    })


