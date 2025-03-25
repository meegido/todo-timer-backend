import express from 'express';
import cors from 'cors';
import { SupabaseTodoRepository } from './infrastructure/repositories/SupabaseTodoRepository';
import { TodoUseCases } from './application/usecases/TodoUseCases';
import { TodoController } from './interfaces/http/TodoController';
import { createTodoRouter } from './interfaces/http/TodoRoutes';
import { config } from './config';

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

// Dependencies
const todoRepository = new SupabaseTodoRepository();
const todoUseCases = new TodoUseCases(todoRepository);
const todoController = new TodoController(todoUseCases);

// Routes
app.use('/api/todos', createTodoRouter(todoController));

// Health check
app.get('/health', (_, res) => res.json({ status: 'ok' }));

// Start server
app.listen(config.server.port, () => {
  console.log(`Server is running on http://localhost:${config.server.port}`);
});
