import sequelize from "../database/connection";
const { User } = sequelize.models;

export const existsUserByEmail = async (email:string = '') => {
  const existsUser = await User.findOne({ where: { email } });
  if(existsUser) 
    throw new Error(`This email is already exists`);
}

export const notExistsUserById = async (id:number) => {
  const existsUser = await User.findByPk(id);  
  if(!existsUser) 
    throw new Error('The user not exists');
}