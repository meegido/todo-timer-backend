import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Todo, CreateTodoDTO, UpdateTodoDTO, TodoVariant } from '../../domain/Todo';
import { TodoRepository } from '../../domain/TodoRepository';

export class SupabaseTodoRepository implements TodoRepository {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase credentials');
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async findAll(): Promise<Todo[]> {
    const { data, error } = await this.supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map(this.mapToTodo);
  }

  async findById(id: string): Promise<Todo | null> {
    const { data, error } = await this.supabase
      .from('todos')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return this.mapToTodo(data);
  }

  async create(todoData: CreateTodoDTO): Promise<Todo> {
    const { data, error } = await this.supabase
      .from('todos')
      .insert([{
        title: todoData.title,
        description: todoData.description,
        variant: todoData.variant,
        completed: false,
      }])
      .select()
      .single();

    if (error) throw error;
    return this.mapToTodo(data);
  }

  async update(id: string, todoData: UpdateTodoDTO): Promise<Todo | null> {
    const updateData: any = {};
    if (todoData.title !== undefined) updateData.title = todoData.title;
    if (todoData.description !== undefined) updateData.description = todoData.description;
    if (todoData.completed !== undefined) updateData.completed = todoData.completed;
    if (todoData.variant !== undefined) updateData.variant = todoData.variant;

    const { data, error } = await this.supabase
      .from('todos')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) return null;
    return this.mapToTodo(data);
  }

  async delete(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('todos')
      .delete()
      .eq('id', id);

    return !error;
  }

  private mapToTodo(data: any): Todo {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      completed: data.completed,
      variant: data.variant as TodoVariant,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }
}
