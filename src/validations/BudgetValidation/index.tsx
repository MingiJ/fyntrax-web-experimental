import Joi from "joi";

const create = Joi.object({
  title: Joi.string().required().min(3).max(256).messages({
    "any.required": "Budget title is required.",
    "string.empty": "Budget title cannot be empty.",
    "string.min": "Budget title must be at least 3 characters.",
    "string.max": "Budget title cannot be more than 256 characters.",
  }),

  totalAmount: Joi.number().precision(2).positive().required().messages({
    "any.required": "Budget amount is required.",
    "number.base": "Budget amount must be a number.",
    "number.positive": "Budget amount must be greater than 0.",
  }),
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  create,
};
