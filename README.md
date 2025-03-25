# Express Todo API with Hexagonal Architecture

A Todo API built with Express.js, TypeScript, and Hexagonal Architecture.

## Project Structure

```
src/
├── application/        # Application business rules
│   └── usecases/      # Use cases implementing business logic
├── domain/            # Enterprise business rules
│   ├── entities/      # Business entities
│   └── repositories/  # Repository interfaces
├── infrastructure/    # External concerns
│   └── repositories/  # Repository implementations
└── interfaces/        # Interface adapters
    └── http/         # HTTP-specific code (controllers, routes)
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

The server will start at http://localhost:3000

## API Endpoints

- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get a specific todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Example Usage

Create a todo:
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Hexagonal Architecture", "description": "Study and implement a project"}'
```

Get all todos:
```bash
curl http://localhost:3000/api/todos
```
