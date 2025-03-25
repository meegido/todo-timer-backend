import { Request, Response } from "express";
import { TodoUseCases } from "../../application/usecases/TodoUseCases";
import { CreateTodoDTO, TodoVariant, UpdateTodoDTO } from "../../domain/Todo";

export class TodoController {
  constructor(private todoUseCases: TodoUseCases) {}

  getAllTodos = async (_req: Request, res: Response): Promise<void> => {
    try {
      const todos = await this.todoUseCases.getAllTodos();
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  getTodoById = async (req: Request, res: Response): Promise<void> => {
    try {
      const todo = await this.todoUseCases.getTodoById(req.params.id);
      if (!todo) {
        res.status(404).json({ error: "Todo not found" });
        return;
      }
      res.json(todo);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  createTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const todoData: CreateTodoDTO = {
        title: req.body.title,
        description: req.body.description,
        variant: TodoVariant.INACTIVE,
      };
      const todo = await this.todoUseCases.createTodo(todoData);
      res.status(201).json(todo);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const todoData: UpdateTodoDTO = {
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed,
        variant: req.body.variant,
      };
      const todo = await this.todoUseCases.updateTodo(req.params.id, todoData);
      if (!todo) {
        res.status(404).json({ error: "Todo not found" });
        return;
      }
      res.json(todo);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const success = await this.todoUseCases.deleteTodo(req.params.id);
      if (!success) {
        res.status(404).json({ error: "Todo not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
