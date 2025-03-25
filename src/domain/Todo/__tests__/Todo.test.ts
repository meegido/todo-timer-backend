import { Todo, TodoVariant, CreateTodoDTO, UpdateTodoDTO } from "../../Todo";

describe("Todo Entity", () => {
  describe("TodoVariant", () => {
    it("should have the correct enum values", () => {
      expect(TodoVariant.INACTIVE).toBe("inactive");
      expect(TodoVariant.ON_GOING).toBe("on__going");
      expect(TodoVariant.PAUSED).toBe("paused");
      expect(TodoVariant.DONE).toBe("done");
    });
  });

  describe("Todo Interface", () => {
    it("should create a valid Todo object", () => {
      const now = new Date();
      const todo: Todo = {
        id: "123",
        title: "Test Todo",
        description: "Test Description",
        completed: false,
        variant: TodoVariant.INACTIVE,
        createdAt: now,
        updatedAt: now,
      };

      expect(todo).toHaveProperty("id", "123");
      expect(todo).toHaveProperty("title", "Test Todo");
      expect(todo).toHaveProperty("description", "Test Description");
      expect(todo).toHaveProperty("completed", false);
      expect(todo).toHaveProperty("variant", TodoVariant.INACTIVE);
      expect(todo.createdAt).toEqual(now);
      expect(todo.updatedAt).toEqual(now);
    });
  });

  describe("CreateTodoDTO", () => {
    it("should create with all required fields", () => {
      const dto: CreateTodoDTO = {
        title: "Test Todo",
        description: "Test Description",
        variant: TodoVariant.INACTIVE
      };

      expect(dto).toHaveProperty("title", "Test Todo");
      expect(dto).toHaveProperty("description", "Test Description");
      expect(dto).toHaveProperty("variant", TodoVariant.INACTIVE);
    });

    it("should accept different variant values", () => {
      const dto: CreateTodoDTO = {
        title: "Test Todo",
        description: "Test Description",
        variant: TodoVariant.ON_GOING
      };

      expect(dto).toHaveProperty("variant", TodoVariant.ON_GOING);
    });
  });

  describe("UpdateTodoDTO", () => {
    it("should allow partial updates", () => {
      const dto: UpdateTodoDTO = {
        title: "Updated Title",
      };

      expect(dto.title).toBe("Updated Title");
      expect(dto.description).toBeUndefined();
      expect(dto.completed).toBeUndefined();
      expect(dto.variant).toBeUndefined();
    });

    it("should allow updating variant", () => {
      const dto: UpdateTodoDTO = {
        variant: TodoVariant.DONE,
      };

      expect(dto.variant).toBe(TodoVariant.DONE);
    });
  });
});
