const express = require('express');
const app = express();
const PORT = process.env.PORT || 5002;
const { Pool } = require('pg');

const cors = require('cors');
app.use(cors()); // Enable CORS for all routes

// Rest of your code

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.use(express.json());

// Define routes here



// const pool = new Pool({
//   connectionString: 'postgresql://localhost:5432/tasks',
// });


const pool = new Pool({
  user: 'colm',
  password: '',
  host: 'localhost',
  port: 5432,
  database: 'colm',
});


// Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add a new task
app.post('/api/tasks', async (req, res) => {
  const { task } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO tasks (task) VALUES ($1) RETURNING *',
      [task]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
