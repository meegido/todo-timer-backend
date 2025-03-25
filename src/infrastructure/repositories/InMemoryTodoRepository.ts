import { v4 as uuidv4 } from "uuid";
import {
  Todo,
  CreateTodoDTO,
  UpdateTodoDTO,
  TodoVariant,
} from "../../domain/Todo";
import { TodoRepository } from "../../domain/TodoRepository";

export class InMemoryTodoRepository implements TodoRepository {
  private todos: Map<string, Todo> = new Map();

  async findAll(): Promise<Todo[]> {
    return Array.from(this.todos.values());
  }

  async findById(id: string): Promise<Todo | null> {
    return this.todos.get(id) || null;
  }

  async create(todoData: CreateTodoDTO): Promise<Todo> {
    const todo: Todo = {
      id: uuidv4(),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...todoData,
    };
    this.todos.set(todo.id, todo);
    return todo;
  }

  async update(id: string, todoData: UpdateTodoDTO): Promise<Todo | null> {
    const existingTodo = this.todos.get(id);
    if (!existingTodo) return null;

    const updatedTodo: Todo = {
      ...existingTodo,
      ...todoData,
      updatedAt: new Date(),
    };
    this.todos.set(id, updatedTodo);
    return updatedTodo;
  }

  async delete(id: string): Promise<boolean> {
    return this.todos.delete(id);
  }
}
