import Joi from 'joi'

const create = Joi.object({
  title: Joi
    .string()
    .required()
    .min(3)
    .max(256)
    .messages({
      'any.required': 'Transaction title is required.',
      'string.empty': 'Transaction title cannot be empty.',
      'string.min': 'Transaction title must be at least 3 characters.',
      'string.max': 'Transaction title cannot be more than 256 characters.',
    }),
  
  amount: Joi
    .number()
    .precision(2)
    .positive()
    .required()
    .messages({
      'any.required': 'Transaction amount is required.',
      'number.base': 'Transaction amount must be a number.',
      'number.positive': 'Transaction amount must be greater than 0.',
    }),

  type: Joi
    .string()
    .required()
    .messages({
      'any.required': 'Transaction type is required.',
      'string.empty': 'Transaction type cannot be empty.'
    }),

  currency: Joi
    .string()
    .required()
    .messages({
      'any.required': 'Transaction currency is required.',
      'string.empty': 'Transaction currency cannot be empty.'
    })
})

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  create
}