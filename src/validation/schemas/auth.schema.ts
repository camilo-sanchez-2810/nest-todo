import * as Joi from 'joi';
const authSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'any.required': 'Email is required',
      'string.empty': 'Email is required',
      'string.email': 'Email is invalid',
    }),
  password: Joi.string()
    .required()
    .min(10)
    .messages({
      'any.required': 'Password is required',
      'string.empty': 'Password is required',
      'string.min':
        'Password must be at least 10 characters long',
    }),
});
export default authSchema;
