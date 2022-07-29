import { NextFunction, Request, Response } from 'express'
import DBServices from '../services/user.services';
const dbServices = new DBServices();
import to from '../helpers/to';

import * as response from '../response/success.response';

import { paginationType, ResultTo, UserType } from '../types';

export default class UsersController {
  async searchUsers(req: Request, res: Response, next: NextFunction) {

    const id = +req.params?.id
    const { from = 1, limit = 100 } = req.query
    const pagination:paginationType = {
      limit: +limit,
      from: +from,
    }

    const [error, result]: ResultTo = await to(
      id 
      ? dbServices.findOne(id)
      : dbServices.find(pagination)
    )
    if(error) return next(error)
    
    response.success(res, result?.count || 1, result)
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    const data = req.body

    const newUser: UserType = {
      name: data.name,
      email: data.email,
      password: data.password,
      isBlock: false,
    }

    const [error, result] = await to(dbServices.create(newUser))
    if(error) return next(error)

    response.success(res, 'Created User', result, 201)
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    const id:number = +req.params.id
    const data = req.body

    const [error, result] = await to(dbServices.update(id, data))
    if(error) return next(error)

    response.success(res, 'Updated User', result)
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    const id:number = +req.params.id

    const [error, _result] = await to(dbServices.delete(id))
    if(error) return next(error)

    response.success(res, 'Deleted User', { id })
  }
}