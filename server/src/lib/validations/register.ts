import joi from "joi";

export const registerSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
  email: joi.string().email().required(),
  fullname: joi.string().required(),
});
