import Joi from 'joi'

const create = Joi.object({
  name: Joi
    .string()
    .required()
    .min(3)
    .max(256)
    .messages({
      'any.required': 'Category name is required.',
      'string.empty': 'Category name cannot be empty.',
      'string.min': 'Category name must be at least 3 characters.',
      'string.max': 'Category name cannot be more than 256 characters.',
    }),
})

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  create
}