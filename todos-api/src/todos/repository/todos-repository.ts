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

export async function findAll(): Promise<Array<Todo>> {
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

  return todos;
}

export async function findById(id: string): Promise<Todo | null> {
  const todosRef = doc(firestore, "todos", id);
  const todoDoc = await getDoc(todosRef);

  if (todoDoc.exists()) {
    return {
      id: todoDoc.id,
      name: todoDoc.data().name,
      description: todoDoc.data().description,
      status: todoDoc.data().status,
    };
  }

  return null;
}

export async function addTodo(data: Todo): Promise<String> {
  const todosRef = collection(firestore, "todos");
  const todo = await addDoc(todosRef, data);

  return todo.id;
}

export async function updateTodo(id: string, data: Todo): Promise<void> {
  const todosRef = doc(firestore, "todos", id);

  await updateDoc(todosRef, {
    ...data,
  });
}

export async function deleteTodo(id: string) {
  const todosRef = doc(firestore, "todos", id);
  await deleteDoc(todosRef);
}
