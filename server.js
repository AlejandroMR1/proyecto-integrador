// Importar las dependencias
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Crear la aplicación de Express
const app = express();

// Middleware para habilitar CORS
app.use(cors());

// Middleware para poder leer JSON
app.use(express.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root', // Reemplaza con tu usuario de MySQL si es necesario
  password: '', // Reemplaza con tu contraseña de MySQL si es necesario
  database: 'EFFITRACK' // El nombre de tu base de datos
});

// Verificar si la conexión a la base de datos es exitosa
db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos MySQL exitosa');
});

// Ruta para obtener todos los empleados
app.get('/api/employees', (req, res) => {
  const query = 'SELECT * FROM EMPLEADOS';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener empleados:', err);
      return res.status(500).json({ error: 'Error al obtener empleados' });
    }
    res.json(results);
  });
});

// Configurar el puerto en el que el servidor escuchará

const PORT = 3306

// Iniciar el servidor en el puerto 5000
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
