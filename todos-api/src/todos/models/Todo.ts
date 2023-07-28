export interface Todo {
  id: string;
  name: string;
  description: string;
  status: "PENDING" | "DONE";
}
