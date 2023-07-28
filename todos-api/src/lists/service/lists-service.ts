import {
  DocumentReference,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import firestore from "../../config/firebase";
import { Todo } from "../../todos/models/Todo";
import { List } from "../models/List";

type AllListsResponse = Array<Omit<List, "todos">>;

export async function findAll(): Promise<AllListsResponse> {
  const lists: AllListsResponse = [];
  const querySnapshot = await getDocs(collection(firestore, "lists"));

  querySnapshot.forEach((doc) => {
    const list = {
      id: doc.id,
      name: doc.data().name,
    };

    lists.push(list);
  });

  return lists;
}

export async function findById(id: string): Promise<List | null> {
  const listsRef = doc(firestore, "lists", id);
  const listDoc = await getDoc(listsRef);

  if (listDoc.exists()) {
    const todosRef: Array<DocumentReference> = listDoc.get("todos");

    const todos: Array<Todo> = await Promise.all(
      todosRef.map(async (ref) => {
        const todoDoc = await getDoc(ref);

        const todo: Todo = {
          id: todoDoc.id,
          name: todoDoc.data()!.name,
          description: todoDoc.data()!.description,
          status: todoDoc.data()!.status,
        };

        return todo;
      })
    );

    const list: List = {
      id: listDoc.id,
      name: listDoc.data().name,
      todos,
    };

    return list;
  }

  return null;
}
