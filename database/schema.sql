CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    rating INTEGER,
    notes TEXT,
    date_read DATE,
    cover_id TEXT
);
