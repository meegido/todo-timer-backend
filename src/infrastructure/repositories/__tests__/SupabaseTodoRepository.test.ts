import { SupabaseTodoRepository } from '../SupabaseTodoRepository';
import { TodoVariant, CreateTodoDTO, UpdateTodoDTO } from '../../../domain/Todo';

// Mock data factory
const createMockTodo = (override = {}) => ({
  id: '1',
  title: 'Test Todo',
  description: 'Test Description',
  completed: false,
  variant: TodoVariant.INACTIVE,
  created_at: '2025-03-13T10:00:00Z',
  updated_at: '2025-03-13T10:00:00Z',
  ...override
});

// Mock Supabase client
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(() => Promise.resolve({
            data: createMockTodo(),
            error: null
          }))
        })),
        order: jest.fn(() => Promise.resolve({
          data: [createMockTodo()],
          error: null
        })),
        single: jest.fn(() => Promise.resolve({
          data: createMockTodo(),
          error: null
        }))
      })),
      insert: jest.fn((data) => ({
        select: jest.fn(() => ({
          single: jest.fn(() => Promise.resolve({
            data: createMockTodo(data[0]),
            error: null
          }))
        }))
      })),
      update: jest.fn((data) => ({
        eq: jest.fn(() => ({
          select: jest.fn(() => ({
            single: jest.fn(() => Promise.resolve({
              data: createMockTodo(data),
              error: null
            }))
          }))
        }))
      })),
      delete: jest.fn(() => ({
        eq: jest.fn(() => Promise.resolve({ error: null }))
      })),
      eq: jest.fn(() => ({
        single: jest.fn(() => Promise.resolve({
          data: createMockTodo(),
          error: null
        }))
      }))
    }))
  }))
}));

describe('SupabaseTodoRepository', () => {
  let repository: SupabaseTodoRepository;

  beforeEach(() => {
    process.env.SUPABASE_URL = 'test_url';
    process.env.SUPABASE_ANON_KEY = 'test_key';
    repository = new SupabaseTodoRepository();
  });

  describe('TodoVariant handling', () => {
    it('should create a todo with INACTIVE variant', async () => {
      const todoData: CreateTodoDTO = {
        title: 'Test Todo',
        description: 'Test Description',
        variant: TodoVariant.INACTIVE
      };

      const todo = await repository.create(todoData);
      expect(todo.variant).toBe(TodoVariant.INACTIVE);
    });

    it('should create a todo with ON_GOING variant', async () => {
      const todoData: CreateTodoDTO = {
        title: 'New Todo',
        description: 'New Description',
        variant: TodoVariant.ON_GOING
      };

      const todo = await repository.create(todoData);
      expect(todo.variant).toBe(TodoVariant.ON_GOING);
    });

    it('should update todo variant to DONE', async () => {
      const updateData: UpdateTodoDTO = {
        variant: TodoVariant.DONE,
        completed: true
      };

      const todo = await repository.update('1', updateData);
      expect(todo?.variant).toBe(TodoVariant.DONE);
      expect(todo?.completed).toBe(true);
    });

    it('should handle PAUSED variant in updates', async () => {
      const updateData: UpdateTodoDTO = {
        variant: TodoVariant.PAUSED
      };

      const todo = await repository.update('1', updateData);
      expect(todo?.variant).toBe(TodoVariant.PAUSED); // Should properly update to PAUSED variant
    });
  });

  describe('CRUD operations', () => {
    it('should find all todos', async () => {
      const todos = await repository.findAll();
      expect(todos).toHaveLength(1);
      expect(todos[0].variant).toBe(TodoVariant.INACTIVE);
    });

    it('should find todo by id', async () => {
      const todo = await repository.findById('1');
      expect(todo).toBeDefined();
      expect(todo?.id).toBe('1');
      expect(todo?.variant).toBe(TodoVariant.INACTIVE);
    });

    it('should delete todo', async () => {
      const result = await repository.delete('1');
      expect(result).toBe(true);
    });
  });
});
