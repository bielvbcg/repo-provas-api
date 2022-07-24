import Joi from "joi";

const testSchema = Joi.object({
  name: Joi.string().required(),
  pdfUrl: Joi.string().required(),
  categoryId: Joi.number().required(),
  teachersDisciplinesId: Joi.number().required(),
})

export default testSchema