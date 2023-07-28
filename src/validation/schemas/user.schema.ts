import * as Joi from 'joi';
const userSchema = Joi.object({
  name: Joi.string()
    .required()
    .min(3)
    .max(15)
    .messages({
      'any.required': 'Name is required',
      'string.empty': 'Name is required',
      'string.min':
        'Name must be longer than 2 characters',
      'string.max':
        'Name must be shorter than 16 characters',
    }),
  last_name: Joi.string()
    .optional()
    .min(0)
    .max(15)
    .messages({
      'string.max':
        'Last name must be shorter than 16 characters',
    }),
  email: Joi.string()
    .required()
    .email()
    .messages({
      'any.required': 'Email is required',
      'string.empty': 'Email is required',
      'string.email': 'Email is not valid',
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
}).messages({
  'object.unknown':
    'You have used an invalid key',
});
export default userSchema;
