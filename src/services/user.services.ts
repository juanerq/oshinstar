import sequelize from "../database/connection";
import to from "../helpers/to";
const { User } = sequelize.models;
import { UserType, paginationType, UpdateUserType } from "../types";

class UserServices {
  async find({ from, limit }: paginationType) {

    const query = {
      offset: from && from - 1,
      limit: limit
    }

    return User.findAndCountAll(query)
    
  }

  async findOne(id: number) {
    const user = await User.findByPk(id, { include: ['notes'] })
    if(!user) throw new Error('User not found')

    return user
  }

  async create(data: UserType) {
    return User.create(data as any)
  }

  async update(id:number, data:UpdateUserType) {
    const [error, user]:any = await to(this.findOne(id))
    if(!user || error) throw new Error('User not found')
    
    return await user.update(data)
  }

  async delete(id:number) {
    const [error, user]:any = await to(this.findOne(id))
    if(!user || error) throw new Error('User not found')
    
    return await user.destroy()
  }
}

export default UserServices