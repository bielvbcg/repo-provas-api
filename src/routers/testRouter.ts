import { Router } from 'express';
import * as testController from '../controllers/testController.js';
import { validateSchemaMiddleware } from '../middlewares/validationSchemaMiddleware.js';
import { ensureAuthenticatedMiddleware } from "../middlewares/authMiddleware.js";
import testSchema from '../schemas/testSchema.js';

const testRouter = Router()

testRouter.use(ensureAuthenticatedMiddleware)
testRouter.get("/tests/:group", testController.getTestsByGroup)
testRouter.post("/tests", validateSchemaMiddleware(testSchema), testController.createTest)

export default testRouter