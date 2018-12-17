import Joi from 'joi'

const loginSchema = Joi.object().keys({
  username: Joi.string().regex(/^\w{5,10}$/),
  password: Joi.string().regex(/^\w{8}$/)
})

export default loginSchema
