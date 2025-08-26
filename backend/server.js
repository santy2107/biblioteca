// backend/server.js
require('dotenv').config( ); // Ruta correcta al .env
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db'); // Importar la conexión a la DB

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

// Conectar a la base de datos
connectDB();

// MiddleWares
app.use(cors()); // Habilita CORS
app.use(express.json()); // Para parsear JSON en el cuerpo de las peticiones
app.use(morgan('dev')); // Logger de peticiones en desarrollo

// Rutas
app.use('/api/auth', authRoutes); // Prefijo para rutas de autenticación
app.use('/api/books', bookRoutes); // Prefijo para rutas de libros

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de Mi Biblioteca Simple está funcionando!');
});

// Manejo de errores básicos (para rutas no encontradas)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Middleware de manejo de errores global (simple)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo salió mal en el servidor!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
