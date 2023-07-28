import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import firestore from "../../config/firebase";
import { Todo } from "../models/Todo";
import { ResponseEntity } from "../../common/types";

export async function findAll(): Promise<ResponseEntity<Array<Todo>>> {
  try {
    const todos: Array<Todo> = [];
    const querySnapshot = await getDocs(collection(firestore, "todos"));

    querySnapshot.forEach((doc) => {
      const todo: Todo = {
        id: doc.id,
        name: doc.data().name,
        description: doc.data().description,
        status: doc.data().status,
      };

      todos.push(todo);
    });

    return [todos, null];
  } catch (error) {
    console.error(error);
    return [null, "There was an error getting the collection"];
  }
}

export async function findById(id: string): Promise<ResponseEntity<Todo>> {
  try {
    const todosRef = doc(firestore, "todos", id);
    const todoDoc = await getDoc(todosRef);

    if (todoDoc.exists()) {
      const todo: Todo = {
        id: todoDoc.id,
        name: todoDoc.data().name,
        description: todoDoc.data().description,
        status: todoDoc.data().status,
      };

      return [todo, null];
    }

    return [null, { status: 404, message: "Document not found" }];
  } catch (error) {
    console.error(error);
    return [null, "There was an error getting this document"];
  }
}

export async function addTodo(
  data: Todo
): Promise<ResponseEntity<{ todo: string }>> {
  try {
    const todosRef = collection(firestore, "todos");
    const todo = await addDoc(todosRef, data);

    return [{ todo: todo.id }, null];
  } catch (error) {
    console.error(error);
    return [null, "There was an error while creating the document"];
  }
}

export async function updateTodo(
  id: string,
  data: Partial<Todo>
): Promise<ResponseEntity<{ todo: Partial<Todo> }>> {
  try {
    const todosRef = doc(firestore, "todos", id);

    await updateDoc(todosRef, data);

    return [{ todo: data }, null];
  } catch (error) {
    console.error(error);
    return [null, "There was an error while updating the document"];
  }
}

export async function deleteTodo(
  id: string
): Promise<ResponseEntity<{ todo: string }>> {
  try {
    const todosRef = doc(firestore, "todos", id);

    await deleteDoc(todosRef);

    return [{ todo: id }, null];
  } catch (error) {
    console.error(error);
    return [null, "There was an error while deleting the document"];
  }
}
