import { Model, DataTypes, Sequelize } from 'sequelize'

export const USER_TABLE_NAME = 'users'

export interface UserSchemaTypes {
  id: number
  name: string
  email: string
  password: string
  isBlock: boolean
  createdAt: Date
}

export const UserSchema = {
  id: {
    type: DataTypes.INTEGER,
    field: 'user_id',
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  isBlock: {
    type: DataTypes.BOOLEAN,
    field: 'is_block',
    defaultValue: false
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
}

export class User extends Model<UserSchemaTypes> {

  static associate (models: any) {
    this.hasMany(models.Note, {
      foreignKey: 'userId',
      as: 'notes'
    })
  }

  static config (sequelize: Sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE_NAME,
      modelName: 'User',
      timestamps: false
    }
  }
}
