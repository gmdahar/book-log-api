CREATE DATABASE book_notes;

-- Create books table 

CREATE TABLE books (
    id SERIAL PRIMARY KEY,             -- Unique ID for each book
    title VARCHAR(255) NOT NULL,       -- Title of the book
    author VARCHAR(255) NOT NULL,      -- Author of the book
    rating INT CHECK (rating BETWEEN 1 AND 10), -- Rating (1 to 10)
    notes TEXT,                        -- Personal notes about the book
    date_read DATE,                    -- Date when the book was read
    isbn VARCHAR(20),                  -- ISBN for fetching the book cover
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for creation
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp for last update
);

-- Insert a sample record:
INSERT INTO books (title, author, rating, notes, date_read, isbn)
VALUES ('Atomic Habits', 'James Clear', 9, 'Great book on habits', '2023-12-01', '0735211299');

