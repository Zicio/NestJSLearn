import * as Joi from 'joi';

export const editBookSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  authors: Joi.string().required(),
});
