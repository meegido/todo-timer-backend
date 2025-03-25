export enum TodoVariant {
  INACTIVE = "inactive",
  ON_GOING = "on__going",
  PAUSED = "paused",
  DONE = "done",
}

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  variant: TodoVariant;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTodoDTO {
  title: string;
  description: string;
  variant: TodoVariant;
}

export interface UpdateTodoDTO {
  title?: string;
  description?: string;
  completed?: boolean;
  variant?: TodoVariant;
}
