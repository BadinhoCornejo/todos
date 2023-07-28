export type ResponseEntity<T> = [
  T | null,
  string | { status: number; message: string } | null
];
