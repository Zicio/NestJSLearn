import * as Joi from 'joi';

export const createBookSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().min(5).optional(),
  authors: Joi.string().min(2).required(),
});
