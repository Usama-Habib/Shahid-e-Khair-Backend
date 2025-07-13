const Joi = require('joi');

const entrySchema = Joi.object({
  type: Joi.string().valid('hadith', 'verse', 'dua').required(),
  source: Joi.string().allow('', null),
  chapter: Joi.string().allow('', null),
  reference: Joi.string().allow('', null),
  arabic_text: Joi.string().required(),
  urdu_translation: Joi.string().allow('', null),
  english_translation: Joi.string().allow('', null),
  tags: Joi.string().allow('', null),
});

module.exports = { entrySchema };
