import { Todo } from "../../todos/models/Todo";

export interface List {
  id: string;
  name: string;
  todos: Array<Todo>;
}
