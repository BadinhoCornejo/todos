import express from "express";

import {
  addTodo,
  updateTodo,
  findAll,
  findById,
  deleteTodo,
} from "../todos/repository/todos-repository";
import { NotFoundError } from "../common";

const router = express.Router();

const BASE_PATH = "/api/v1/todos";

router.get(BASE_PATH, async (req, res) => {
  const todos = await findAll();

  res.send(todos);
});

router.get(`${BASE_PATH}/:id`, async (req, res) => {
  const todo = await findById(req.params.id);

  res.send(todo);
});

router.post(BASE_PATH, async (req, res) => {
  const todo = await addTodo(req.body);

  res.send(todo);
});

router.put(`${BASE_PATH}/:id`, async (req, res) => {
  try {
    await updateTodo(req.params.id, req.body);
    res.send(200);
  } catch (error) {
    throw new NotFoundError();
  }
});

router.delete(`${BASE_PATH}/:id`, async (req, res) => {
  try {
    await deleteTodo(req.params.id);
    res.send(200);
  } catch (error) {
    throw new NotFoundError();
  }
});

export { router as todosRouter };
