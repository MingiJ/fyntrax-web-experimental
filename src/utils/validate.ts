import Joi from 'joi'

type ValidationResult = {
  result: any,
  isValid: boolean
}

const validate = (schema: Joi.Schema, data: any): ValidationResult => {
  const options: Joi.ValidationOptions = {
    abortEarly: false,
    allowUnknown: true
  }

  const { value, error } = schema.validate(data, options)

  if (error) {
    const errors = {}

    error.details.forEach((err: any) => {
      // @ts-ignore
      errors[err.context?.key] = err.message
    })

    return {
      result: errors,
      isValid: false
    }
  }

  return {
    result: value,
    isValid: true
  }
}

export default validate