const express = require('express');
const router = express.Router();
const { entrySchema } = require('../validators/entryValidator');
const validate = require('../middlewares/validate');
const controller = require('../controllers/entriesController');

// GET ROUTES
router.get('/', controller.getAllEntries);
router.get('/latest', controller.getLatestEntries);
router.get('/search', controller.searchEntries);
router.get('/type/:type', controller.getEntriesByType);
router.get('/:id', controller.getEntryById);
router.get('/tag/:tag', controller.getEntriesByTag);


// POST ROUTES
router.post('/', validate(entrySchema), controller.createEntry);

// PUT ROUTES
router.put('/:id', validate(entrySchema), controller.updateEntry);

// DELETE ROUTES
router.delete('/:id', controller.deleteEntry);


module.exports = router;
