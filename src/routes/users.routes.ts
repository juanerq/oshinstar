import express from 'express';
const router = express.Router();
import UsersController from '../controllers/users.controller';
const userController = new UsersController()

import { validateCreateUser, validateUpdateUser } from '../validators/user.validators';
import { validateFilters, validateId } from '../validators/filter.validators';

router.route('/')
  .post(validateCreateUser, userController.createUser)

router.route('/:id?')
  .get(validateFilters, userController.searchUsers)

router.route('/:id')
  .put(validateUpdateUser, userController.updateUser)
  .delete(validateId, userController.deleteUser)


export default router;