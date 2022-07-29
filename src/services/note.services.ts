import sequelize from "../database/connection";
import to from "../helpers/to";
const { Note } = sequelize.models;
import { NoteType, paginationType, UpdateNoteType } from "../types";

class NoteServices {
  async find({ from, limit }: paginationType) {

    const query = {
      offset: from && from - 1,
      limit: limit
    }
    return Note.findAndCountAll({
      ...query,
      include: ['user']
    })
  }

  async findOne(id: number) {
    const note = await Note.findByPk(id, { include: ['user'] })
    if(!note) throw new Error('Note not found')

    return note
  }

  async create(data: NoteType) {
    return Note.create(data as any)
  }

  async update(id:number, data:UpdateNoteType) {
    const [error, note]:any = await to(this.findOne(id))
    if(!note || error) throw new Error('Note not found')
    
    return await note.update(data)
  }

  async delete(id:number) {
    const [error, note]:any = await to(this.findOne(id))    
    if(!note || error) throw new Error('Note not found')
    
    return await note.destroy()
  }
}

export default NoteServices