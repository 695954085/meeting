import Joi from 'joi'

const registerSchema = Joi.object().keys({
  usercard: Joi.string().regex(/^A\d{4}$/),
  username: Joi.string().regex(/^\w{5,10}$/),
  password: Joi.string().regex(/^\w{6,8}$/),
  confirmPassword: Joi.string().regex(/^\w{6,8}$/)
})

export default registerSchema
