import { Sequelize } from 'sequelize'
import { User, UserSchema } from "./user.model";
import { Note, NoteSchema } from "./notes.model";

const setupModels = async (sequelize: Sequelize) => {
  User.init(UserSchema, User.config(sequelize))
  Note.init(NoteSchema, Note.config(sequelize))

  User.associate(sequelize.models)
  Note.associate(sequelize.models)
}

export default setupModels