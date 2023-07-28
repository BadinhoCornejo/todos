import express from "express";

import { findAll, findById } from "../lists/repository/lists-repository";

const router = express.Router();

const BASE_PATH = "/api/v1/lists";

router.get(BASE_PATH, async (req, res) => {
  const lists = await findAll();

  res.send(lists);
});

router.get(`${BASE_PATH}/:id`, async (req, res) => {
  const list = await findById(req.params.id);

  res.send(list);
});

export { router as listsRouter };
