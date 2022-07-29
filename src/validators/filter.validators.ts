import { check } from "express-validator";
import validateFields from "../middlewares/validate-fields";

export const validateFilters = [
  check('id', 'Id is required').optional().isNumeric(),
  check('from', 'Invalid from').optional().isNumeric(),
  check('limit', 'Invalid limit').optional().isNumeric(),
  validateFields
]

export const validateId = [
  check('id', 'Id is invalid').isNumeric(),
  validateFields
]