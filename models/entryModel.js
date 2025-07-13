const db = require('../config/db');

const createEntry = async (entry) => {
  const [result] = await db.query(`
    INSERT INTO islamic_entries 
    (type, source, chapter, reference, arabic_text, urdu_translation, english_translation, tags)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [
      entry.type,
      entry.source,
      entry.chapter,
      entry.reference,
      entry.arabic_text,
      entry.urdu_translation,
      entry.english_translation,
      entry.tags
    ]);
  return result.insertId;
};

const updateEntry = async (id, entry) => {
    const {
      type, source, chapter, reference, arabic_text,
      urdu_translation, english_translation, tags
    } = entry;
  
    const [result] = await db.query(`
      UPDATE islamic_entries
      SET type = ?, source = ?, chapter = ?, reference = ?, arabic_text = ?, urdu_translation = ?, english_translation = ?, tags = ?
      WHERE id = ?
    `, [type, source, chapter, reference, arabic_text, urdu_translation, english_translation, tags, id]);
  
    return result.affectedRows > 0;
  };
  

  const deleteEntry = async (id) => {
    const [result] = await db.query('DELETE FROM islamic_entries WHERE id = ?', [id]);
    return result.affectedRows > 0;
  };

const getAllEntries = async () => {
  const [rows] = await db.query('SELECT * FROM islamic_entries ORDER BY created_at DESC');
  return rows;
};

const getLatestEntries = async () => {
    const [rows] = await db.query('SELECT * FROM islamic_entries ORDER BY created_at DESC LIMIT 10');
    return rows;
  };
  
const getEntryById = async (id) => {
    const [rows] = await db.query('SELECT * FROM islamic_entries WHERE id = ?', [id]);
    return rows[0];
  };
  
const getEntriesByType = async (type) => {
    const [rows] = await db.query('SELECT * FROM islamic_entries WHERE type = ?', [type]);
    return rows;
  };
  
const searchEntries = async (query) => {
    const likeQuery = `%${query}%`;
    const [rows] = await db.query(`
      SELECT * FROM islamic_entries 
      WHERE arabic_text LIKE ? OR urdu_translation LIKE ? OR english_translation LIKE ? OR tags LIKE ?
    `, [likeQuery, likeQuery, likeQuery, likeQuery]);
    return rows;
  };

const getEntriesByTag = async (tag) => {
    const likeTag = `%${tag}%`;
    const [rows] = await db.query('SELECT * FROM islamic_entries WHERE tags LIKE ?', [likeTag]);
    return rows;
  };

  module.exports = { createEntry, updateEntry, deleteEntry, getAllEntries, getEntriesByTag, searchEntries, getEntryById, getEntriesByType, getLatestEntries };
