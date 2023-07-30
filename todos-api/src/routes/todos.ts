import express from "express";

import { checkSchema, param } from "express-validator";
import { validateRequest } from "../common";
import { getError } from "../common/utils";
import {
    addTodo,
    deleteTodo,
    findAll,
    findById,
    updateTodo,
} from "../todos/service/todos-service";

const router = express.Router();

const BASE_PATH = "/api/v1/todos";

router.get(BASE_PATH, async (req, res) => {
  const [todos, error] = await findAll();

  if (error && !todos) {
    const { status, message } = getError(error);

    res.status(status);

    return res.send({ message });
  }

  res.send(todos);
});

router.get(
  `${BASE_PATH}/:id`,
  param("id").isAlphanumeric().withMessage("El id debe ser alfanumérico"),
  validateRequest,
  async (req, res) => {
    const [todo, error] = await findById(req.params.id);

    if (error && !todo) {
      const { status, message } = getError(error);

      res.status(status);

      return res.send({ message });
    }

    res.send(todo);
  }
);

router.post(
  BASE_PATH,
  checkSchema({
    name: {
      in: "body",
      notEmpty: { errorMessage: "El nombre (name) es un campo obligatorio" },
      exists: { errorMessage: "El nombre (name) es un campo obligatorio" },
    },
    description: {
      in: "body",
      notEmpty: {
        errorMessage: "La descripción (description) es un campo obligatorio",
      },
      exists: {
        errorMessage: "La descripción (description) es un campo obligatorio",
      },
    },
    status: {
      in: "body",
      notEmpty: { errorMessage: "El estado (status) es un campo obligatorio" },
      exists: { errorMessage: "El estado (status) es un campo obligatorio" },
      matches: {
        options: /^PENDING$|^DONE$/,
        errorMessage: "El estado (status) debe ser PENDING o DONE",
      },
    },
  }),
  validateRequest,
  async (req: express.Request, res: express.Response) => {
    const [todo, error] = await addTodo(req.body);

    if (error && !todo) {
      const { status, message } = getError(error);

      res.status(status);

      return res.send({ message });
    }

    res.send(todo);
  }
);

router.put(
  `${BASE_PATH}/:id`,
  checkSchema({
    id: {
      in: "params",
      notEmpty: { errorMessage: "Debe especificar el (id) del documento" },
      exists: { errorMessage: "Debe especificar el (id) del documento" },
    },
    name: {
      in: "body",
      notEmpty: { errorMessage: "El nombre (name) es un campo obligatorio" },
      exists: { errorMessage: "El nombre (name) es un campo obligatorio" },
    },
    description: {
      in: "body",
      notEmpty: {
        errorMessage: "La descripción (description) es un campo obligatorio",
      },
      exists: {
        errorMessage: "La descripción (description) es un campo obligatorio",
      },
    },
    status: {
      in: "body",
      notEmpty: { errorMessage: "El estado (status) es un campo obligatorio" },
      exists: { errorMessage: "El estado (status) es un campo obligatorio" },
      matches: {
        options: /^PENDING$|^DONE$/,
        errorMessage: "El estado (status) debe ser PENDING o DONE",
      },
    },
  }),
  validateRequest,
  async (req: express.Request, res: express.Response) => {
    const [todo, error] = await updateTodo(req.params.id, req.body);

    if (error && !todo) {
      const { status, message } = getError(error);

      res.status(status);

      return res.send({ message });
    }

    res.send(200);
  }
);

router.delete(
  `${BASE_PATH}/:id`,
  param("id").isAlphanumeric().withMessage("El id debe ser alfanumérico"),
  validateRequest,
  async (req, res) => {
    const [todo, error] = await deleteTodo(req.params.id);

    if (error && !todo) {
      const { status, message } = getError(error);

      res.status(status);

      return res.send({ message });
    }

    res.send(200);
  }
);

export { router as todosRouter };
