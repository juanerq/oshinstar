import { Model, DataTypes, Sequelize } from 'sequelize'

import { USER_TABLE_NAME } from './user.model'

export const NOTE_TABLE_NAME = 'notes'

export interface NoteSchemaTypes {
  id: number
  title: string
  description: string
  important: boolean
  createdAt: Date
  userId: number
}

export const NoteSchema = {
  id: {
    type: DataTypes.INTEGER,
    field: 'note_id',
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  important: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user',
    references: {
      model: USER_TABLE_NAME,
      key: 'user_id'
    }
  }
}

export class Note extends Model<NoteSchemaTypes> {

  static associate (models:any) {
    this.belongsTo(models.User, { as: 'user' })
  }

  static config (sequelize: Sequelize) {
    return {
      sequelize,
      tableName: NOTE_TABLE_NAME,
      modelName: 'Note',
      timestamps: false
    }
  }
}
