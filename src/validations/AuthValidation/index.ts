import Joi from 'joi'

// Register validation.
export const registerSchema = Joi.object({
  firstname: Joi
    .string()
    .min(2)
    .max(30)
    .required()
    .messages({
      'any.required': 'Your first name is required.',
      'string.empty': 'Your first name cannot be empty.',
      'string.min': 'Your first name must be at least 2 characters long.',
      'string.max': 'Your first name cannot be more than 30 characters.'
    }),
  
  lastname: Joi
    .string()
    .min(2)
    .max(30)
    .required()
    .messages({
      'any.required': 'Your last name is required.',
      'string.empty': 'Your last name cannot be empty.',
      'string.min': 'Your last name must be at least 2 characters long.',
      'string.max': 'Your last name cannot be more than 30 characters.'
    }),
  
  email: Joi
    .string()
    .email({ minDomainSegments: 2, tlds: { deny: [] } })
    .required()
    .max(320)
    .messages({
      'any.required': 'Your email is required.',
      'string.empty': 'Your email cannot be empty.',
      'string.max': 'Your email cannot be more than 320 characters.',
      'string.email': 'Your email is not valid.'
    }),
  
  password: Joi
    .string()
    .required()
    .min(8)
    .max(128)
    .messages({
      'any.required': 'You must set a password.',
      'string.empty': 'You must set a password.',
      'string.min': 'Your password must be at least 8 characters long.',
      'string.max': 'Your password cannot be more than 128 characters.'
    }),
  
  passwordConfirm: Joi
    .string()
    .required()
    .valid(Joi.ref('password'))
    .messages({
      'any.required': 'Your must confirm your password.',
      'string.empty': 'Your must confirm your password.',
      'any.only': 'Passwords do not match.'
    }),
})

// Login validation.
export const loginSchema = Joi.object({
  email: Joi
    .string()
    .email({
      minDomainSegments: 2,
      tlds: { deny: [] }
    })
    .required()
    .max(320)
    .messages({
      'any.required': 'Your email is required.',
      'string.empty': 'Your email cannot be empty.',
      'string.max': 'Your email cannot be more than 320 characters.',
      'string.email': 'Your email is not valid.'
    }),
  
  password: Joi
    .string()
    .required()
    .max(128)
    .messages({
      'any.required': 'Your password is required.',
      'string.empty': 'You must enter your password.',
      'string.max': 'Your password cannot be more than 128 characters.'
    }),
})
