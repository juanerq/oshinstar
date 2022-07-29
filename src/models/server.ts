import express, { Application } from 'express'
const cors = require('cors');

import { errorHandler, ormErrorHandler, error404, logErrors } from '../middlewares/errors.handler';

import userRoutes from '../routes/users.routes';
import noteRoutes from '../routes/notes.routes';

export default class Server {

  private app: Application;
  private port: string;
  private apiPaths = {
    base: '/api',
    users: '/users',
    notes: '/notes',
  }

  constructor() {
    this.port = process.env.PORT || '3000';
    this.app = express();

    this.middlewares()
    this.routes()
  }

  dbConnection() {

  }
  
  middlewares() {
    this.app.use(express.json(), cors());
  }

  routes() {
    this.app.use(`${this.apiPaths.base}${this.apiPaths.users}`, userRoutes);
    this.app.use(`${this.apiPaths.base}${this.apiPaths.notes}`, noteRoutes);

    this.app.use(logErrors)
    this.app.use(error404)
    this.app.use(ormErrorHandler)
    this.app.use(errorHandler)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

