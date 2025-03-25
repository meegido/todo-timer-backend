import { Todo, CreateTodoDTO, UpdateTodoDTO } from "../../domain/Todo";
import { TodoRepository } from "../../domain/TodoRepository";

export class TodoUseCases {
  constructor(private todoRepository: TodoRepository) {}

  async getAllTodos(): Promise<Todo[]> {
    return this.todoRepository.findAll();
  }

  async getTodoById(id: string): Promise<Todo | null> {
    return this.todoRepository.findById(id);
  }

  async createTodo(todoData: CreateTodoDTO): Promise<Todo> {
    return this.todoRepository.create(todoData);
  }

  async updateTodo(id: string, todoData: UpdateTodoDTO): Promise<Todo | null> {
    return this.todoRepository.update(id, todoData);
  }

  async deleteTodo(id: string): Promise<boolean> {
    return this.todoRepository.delete(id);
  }
}
