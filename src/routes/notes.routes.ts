import express from 'express';
const router = express.Router();
import NotesController from '../controllers/notes.controller';
const notesController = new NotesController()

import { validateCreateNote, validateUpdateNote } from '../validators/note.validators';
import { validateFilters, validateId } from '../validators/filter.validators';

router.route('/')
  .post(validateCreateNote, notesController.createUser)
  
router.route('/:id?')
  .get(validateFilters, notesController.searchNotes)

router.route('/:id')
  .put(validateUpdateNote, notesController.updateNote)
  .delete(validateId, notesController.deleteNote)


export default router;