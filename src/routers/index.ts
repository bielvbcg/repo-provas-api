import { Router } from "express";

const router = Router();

router.get("/health", (req, res) => {
  res.send("estou funcionando")
})

export default router;