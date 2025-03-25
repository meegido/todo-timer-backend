import { Todo, CreateTodoDTO, UpdateTodoDTO } from "./Todo";

export interface TodoRepository {
  findAll(): Promise<Todo[]>;
  findById(id: string): Promise<Todo | null>;
  create(todo: CreateTodoDTO): Promise<Todo>;
  update(id: string, todo: UpdateTodoDTO): Promise<Todo | null>;
  delete(id: string): Promise<boolean>;
}
