import { check } from "express-validator";
import { existsUserByEmail } from "../helpers/db-validators";
import validateFields from "../middlewares/validate-fields";

export const validateCreateUser = [
  check('name', 'Name is required').not().isEmpty(),
  check('password', 'Password must be more than 6 characters').isLength({ min: 6 }),
  check('email', 'This email is invalid').isEmail(),
  check('email').custom(existsUserByEmail),
  validateFields
]

export const validateUpdateUser = [
  check('name', 'Name is required').optional().isString(),
  check('password', 'Password must be more than 6 characters').optional().isLength({ min: 6 }),
  check('email', 'This email is invalid').optional().isEmail(),
  check('isBlock', 'isBlock is required').optional().isBoolean(),
  check('email').optional().custom(existsUserByEmail),
  validateFields
]