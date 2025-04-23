import express from 'express';
import 'reflect-metadata';
import { UserController } from './controllers/user.controller';
import { DepartmentController } from './controllers/department.controller';

const app = express();
const port = process.env.PORT || 3100;

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[REQUEST] ${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Add error logging for unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

app.use(express.json());

// Initialize controllers
console.log('Initializing controllers...');
const userController = new UserController();
const departmentController = new DepartmentController();

// Use controller routers with their base paths
console.log('Setting up routes...');
app.use('/api/users', (req, res, next) => {
  console.log('[USER ROUTER] Request received:', req.method, req.url);
  userController.getRouter()(req, res, next);
});

app.use('/api/departments', (req, res, next) => {
  console.log('[DEPARTMENT ROUTER] Request received:', req.method, req.url);
  departmentController.getRouter()(req, res, next);
});

// 404 handler
app.use((req, res) => {
  console.log('[404] Route not found:', req.method, req.url);
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('[ERROR HANDLER] Error processing request:', req.method, req.url);
  console.error('Error details:', err);
  console.error('Stack trace:', err.stack);
  res.status(500).json({ 
    message: err instanceof Error ? err.message : 'Internal server error',
    path: req.url,
    method: req.method
  });
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('Available routes:');
  console.log('- GET /api/users');
  console.log('- GET /api/users/:id');
  console.log('- POST /api/users');
  console.log('- PUT /api/users/:id');
  console.log('- DELETE /api/users/:id');
  console.log('- GET /api/departments');
  console.log('- GET /api/departments/:id');
  console.log('- POST /api/departments');
  console.log('- PUT /api/departments/:id');
  console.log('- DELETE /api/departments/:id');
});

// Handle server errors
server.on('error', (error) => {
  console.error('Server error:', error);
}); 