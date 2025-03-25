import { InMemoryTodoRepository } from "../InMemoryTodoRepository";
import {
  Todo,
  TodoVariant,
  CreateTodoDTO,
  UpdateTodoDTO,
} from "../../../domain/Todo";

describe("InMemoryTodoRepository", () => {
  let repository: InMemoryTodoRepository;

  beforeEach(() => {
    repository = new InMemoryTodoRepository();
  });

  describe("create", () => {
    it("should create a todo with default variant as INACTIVE", async () => {
      const todoData: CreateTodoDTO = {
        title: "Test Todo",
        description: "Test Description",
        variant: TodoVariant.INACTIVE
      };

      const created = await repository.create(todoData);

      expect(created).toHaveProperty("id");
      expect(created.title).toBe(todoData.title);
      expect(created.description).toBe(todoData.description);
      expect(created.completed).toBe(false);
      expect(created.variant).toBe(TodoVariant.INACTIVE);
      expect(created.createdAt).toBeInstanceOf(Date);
      expect(created.updatedAt).toBeInstanceOf(Date);
    });

    it("should create a todo with specified variant", async () => {
      const todoData: CreateTodoDTO = {
        title: "Test Todo",
        description: "Test Description",
        variant: TodoVariant.ON_GOING,
      };

      const created = await repository.create(todoData);

      expect(created.variant).toBe(TodoVariant.ON_GOING);
    });
  });

  describe("update", () => {
    it("should update todo variant", async () => {
      const todo = await repository.create({
        title: "Test Todo",
        description: "Test Description",
        variant: TodoVariant.INACTIVE
      });

      const updated = await repository.update(todo.id, {
        variant: TodoVariant.DONE,
      });

      expect(updated).not.toBeNull();
      expect(updated!.variant).toBe(TodoVariant.DONE);
      expect(updated!.title).toBe(todo.title);
      expect(updated!.description).toBe(todo.description);
    });

    it("should return null when updating non-existent todo", async () => {
      const result = await repository.update("non-existent", {
        variant: TodoVariant.DONE,
      });

      expect(result).toBeNull();
    });
  });

  describe("findById", () => {
    it("should find todo with correct variant", async () => {
      const created = await repository.create({
        title: "Test Todo",
        description: "Test Description",
        variant: TodoVariant.PAUSED,
      });

      const found = await repository.findById(created.id);

      expect(found).not.toBeNull();
      expect(found!.variant).toBe(TodoVariant.PAUSED);
    });

    it("should return null for non-existent todo", async () => {
      const found = await repository.findById("non-existent");

      expect(found).toBeNull();
    });
  });

  describe("findAll", () => {
    it("should return all todos with their variants", async () => {
      await repository.create({
        title: "Todo 1",
        description: "Description 1",
        variant: TodoVariant.ON_GOING,
      });

      await repository.create({
        title: "Todo 2",
        description: "Description 2",
        variant: TodoVariant.PAUSED,
      });

      const todos = await repository.findAll();

      expect(todos).toHaveLength(2);
      expect(todos[0].variant).toBeDefined();
      expect(todos[1].variant).toBeDefined();
    });
  });

  describe("delete", () => {
    it("should delete todo", async () => {
      const todo = await repository.create({
        title: "Test Todo",
        description: "Test Description",
        variant: TodoVariant.INACTIVE
      });

      const deleted = await repository.delete(todo.id);
      const found = await repository.findById(todo.id);

      expect(deleted).toBe(true);
      expect(found).toBeNull();
    });

    it("should return false when deleting non-existent todo", async () => {
      const result = await repository.delete("non-existent");

      expect(result).toBe(false);
    });
  });
});
