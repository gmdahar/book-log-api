import express from 'express';
import pkg from 'pg';
import dotenv from 'dotenv';
import ejsMate from 'ejs-mate';

dotenv.config();

const { Pool } = pkg;
const app = express();
const PORT = 3000;

// Database Configuration
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Middleware

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate); // Use ejs-mate as the view engine
app.set('view engine', 'ejs');

// Routes

// Home Route: Display books
app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM books ORDER BY date_read DESC');
        res.render('index', { title: 'Book List', books: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving books from the database.');
    }
});

// Add Book Form
app.get('/add', (req, res) => {
    res.render('add-book', { title: 'Add Book' });
});

// Add Book Submission
app.post('/add', async (req, res) => {
    const { title, author, rating, notes, date_read , isbn} = req.body;
    console.log(" This is request body :");
    console.log(req.body); 
    try {
      
        await pool.query(
            'INSERT INTO books (title, author, rating, notes, date_read, isbn) VALUES ($1, $2, $3, $4, $5, $6)',
            [title, author, rating, notes, date_read, isbn]
        );
        
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding the book.');
    }
});

// Edit Book Form
app.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            res.render('edit-book', { title: 'Edit Book', book: result.rows[0] });
        } else {
            res.status(404).send('Book not found.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving the book.');
    }
});

// Edit Book Submission
app.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, rating, notes, date_read , isbn} = req.body;
    try {
        await pool.query(
            'UPDATE books SET title = $1, author = $2, rating = $3, notes = $4, date_read = $5, isbn = $6 WHERE id = $7',
            [title, author, rating, notes, date_read, isbn, id]
        );
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating the book.');
    }
});

// Delete Book
app.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM books WHERE id = $1', [id]);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting the book.');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
