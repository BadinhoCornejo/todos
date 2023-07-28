import express from "express";
import cors from "cors";

import env from "./config/environment";
import { errorHandler, NotFoundError } from "./common";

import { healthCheckRouter } from "./routes/health-check";
import { listsRouter } from "./routes/lists";
import { todosRouter } from "./routes/todos";

import "./config/firebase";

const app = express();

app.use(cors());
app.use(express.json());

app.use(healthCheckRouter);
app.use(listsRouter);
app.use(todosRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(env.PORT, () => console.log(`Listening on ${env.PORT}`));
