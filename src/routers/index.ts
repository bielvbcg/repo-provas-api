import { Router } from "express";
import userRouter from "./userRouter.js";

const router = Router();

router.use(userRouter)

router.get("/health", (req, res) => {
  res.send("estou funcionando")
})

export default router;