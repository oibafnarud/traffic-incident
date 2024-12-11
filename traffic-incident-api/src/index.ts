import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import dotenv from 'dotenv';

// Configuración
import { connectDB } from './config/database';  // Cambiado a importación nombrada

// Middleware
import { errorHandler } from './middleware/errorHandler';

// Rutas
import userRoutes from './routes/userRoutes';
import vehicleRoutes from './routes/vehicleRoutes';
import incidentRoutes from './routes/incidentRoutes';
import evidenceRoutes from './routes/evidenceRoutes';
import digesettRoutes from './routes/digesettRoutes';
import authRoutes from './routes/authRoutes';
import workshopRoutes from './routes/workshopRoutes';
// Temporalmente comentado hasta que exista
// import notificationRoutes from './routes/notificationRoutes';

// Inicialización
dotenv.config();
const app: Express = express();
const PORT = process.env.PORT || 3001;

// Middleware global
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Ruta de estado
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Traffic Incident API',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      vehicles: '/api/vehicles', 
      incidents: '/api/incidents',
      evidence: '/api/evidence',
      notifications: '/api/notifications',
      digesett: '/api/digesett'
    }
  });
});

// app.use('/api/notifications', notificationRoutes);  // Temporalmente comentado
app.use('/api/digesett', digesettRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api/evidence', evidenceRoutes);
app.use('/api/digesett', digesettRoutes);

// Archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Manejo de errores
app.use(errorHandler);

// Agregar las rutas de workshops
app.use('/api/workshops', workshopRoutes);

// Conexión a la base de datos
connectDB().then(() => {
  // Iniciar servidor
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
  });
}).catch((error: Error) => {  // Añadido tipo explícito
  console.error('Database connection failed:', error);
  process.exit(1);
});

// Manejo de errores no capturados
process.on('unhandledRejection', (err: Error) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err);
  process.exit(1);
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

export default app;