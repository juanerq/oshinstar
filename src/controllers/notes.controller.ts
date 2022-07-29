import { NextFunction, Request, Response } from 'express'
import DBServices from '../services/note.services';
const dbServices = new DBServices();
import to from '../helpers/to';

import * as response from '../response/success.response';

import { NoteType, paginationType, ResultTo } from '../types';

export default class NotesController {
  async searchNotes(req: Request, res: Response, next: NextFunction) {

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

    const newNote: NoteType = {
      title: data.title,
      description: data.description,
      important: data.important,
      userId: data.user
    }

    const [error, result] = await to(dbServices.create(newNote))
    if(error) return next(error)

    response.success(res, 'Created Note', result, 201)
  }

  async updateNote(req: Request, res: Response, next: NextFunction) {
    const id:number = +req.params.id
    const data = req.body

    const [error, result] = await to(dbServices.update(id, data))
    if(error) return next(error)

    response.success(res, 'Updated Note', result)
  }

  async deleteNote(req: Request, res: Response, next: NextFunction) {
    const id:number = +req.params.id

    const [error, _result] = await to(dbServices.delete(id))
    if(error) return next(error)

    response.success(res, 'Deleted Note', { id })
  }
}