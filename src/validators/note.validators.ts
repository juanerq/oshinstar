import { check } from "express-validator";
import { notExistsUserById } from "../helpers/db-validators";
import validateFields from "../middlewares/validate-fields";

export const validateCreateNote = [
  check('title', 'Title is required').not().isEmpty().isString(),
  check('description', 'Description must be more than 6 characters').not().isEmpty().isString(),
  check('important', 'Important parameter is not valid').isBoolean(),
  check('user').custom(notExistsUserById),
  validateFields
]

export const validateUpdateNote = [
  check('title', 'Title is required').optional().not().isEmpty().isString(),
  check('description', 'Description must be more than 6 characters').optional().not().isEmpty().isString(),
  check('important', 'Important parameter is not valid').optional().isBoolean(),
  check('user').optional().custom(notExistsUserById),
  validateFields
]