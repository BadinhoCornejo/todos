import express from "express";

const router = express.Router();

router.get("/api/v1/health-check", (req, res) => {
  res.send({ success: true });
});

export { router as healthCheckRouter };
