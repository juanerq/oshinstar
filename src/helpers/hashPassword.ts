import bcrypt from 'bcrypt';

const hashPassword = (password: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        reject(err);
      }
      resolve(hash);
    })
  })
}

export default hashPassword