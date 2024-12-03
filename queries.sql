CREATE DATABASE book_notes;

-- Create Table 

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    notes TEXT,
    date_read DATE,
    cover_url TEXT,
    metadata JSONB
);

-- Insert Sample Data  to Test Schme 

INSERT INTO books (title, author, rating, notes, date_read, cover_url, metadata)
VALUES 
('The Catcher in the Rye', 'J.D. Salinger', 4, 'A classic novel about teenage angst.', '2024-01-01', 'https://covers.openlibrary.org/b/id/8224171-L.jpg', NULL),
('1984', 'George Orwell', 5, 'Dystopian masterpiece.', '2024-01-02', NULL, '{"pages": 328, "language": "English"}');

-- Check 

SELECT * FROM books;
