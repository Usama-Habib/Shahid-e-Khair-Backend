const EntryModel = require('../models/entryModel');
const { handleSuccess, handleError } = require('../utils/responseHandler');


exports.getAllEntries = async (_req, res) => {
  try {
    const entries = await EntryModel.getAllEntries();
    handleSuccess(res, entries);
  } catch (error) {
    handleError(res,error);
  }
};

exports.getLatestEntries = async (req, res) => {
  try {
    const entries = await EntryModel.getLatestEntries();
    handleSuccess(res, entries);
  } catch (error) {
    handleError(res, error);
  }
};

exports.getEntryById = async (req, res) => {
  try {
    const entry = await EntryModel.getEntryById(req.params.id);
    if (!entry) return res.status(404).json({ error: 'Entry not found' });
    handleSuccess(res, entry);
  } catch (error) {
    handleError(res, error);
  }
};

exports.getEntriesByType = async (req, res) => {
  try {
    const entries = await EntryModel.getEntriesByType(req.params.type);
    handleSuccess(res, entries);
  } catch (error) {
    handleError(res, error);
  }
};

exports.searchEntries = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'Search query is required' });
    const results = await EntryModel.searchEntries(q);
    handleSuccess(res, results);
  } catch (error) {
    handleError(res, error);
  }
};

exports.getEntriesByTag = async (req, res) => {
  try {
    const tag = req.params.tag;
    if (!tag) return res.status(400).json({ error: 'Tag is required' });

    const entries = await EntryModel.getEntriesByTag(tag);
    handleSuccess(res, entries);
  } catch (error) {
    handleError(res, error);
  }
};


// POST ENTRIES CONTROLLER


exports.createEntry = async (req, res) => {
  try {
    const id = await EntryModel.createEntry(req.body);
    res.status(201).json({ id, message: 'Entry added successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateEntry = async (req, res) => {
  try {
    const updated = await EntryModel.updateEntry(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Entry not found' });
    res.json({ message: 'Entry updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteEntry = async (req, res) => {
  try {
    const deleted = await EntryModel.deleteEntry(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Entry not found' });
    res.json({ message: 'Entry deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};