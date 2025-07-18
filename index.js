require("dotenv").config();
const express = require("express");
const app = express();
const { Pool } = require("pg");
const methodOverride = require("method-override");
const axios = require("axios");

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

// Homepage: list books
app.get("/", async (req, res) => {
    const sort = req.query.sort || "date_read";
    const books = await pool.query(`SELECT * FROM books ORDER BY ${sort} DESC`);

    res.render("index", { books: books.rows, sort });
});

// Form to add new book
app.get("/books/new", (req, res) => {
    res.render("new");
});

// Add new book
app.post("/books", async (req, res) => {
    const { title, author, rating, notes, date_read, cover_id } = req.body;
    await pool.query(
        "INSERT INTO books (title, author, rating, notes, date_read, cover_id) VALUES ($1, $2, $3, $4, $5, $6)",
        [title, author, rating, notes, date_read, cover_id]
    );
    res.redirect("/");
});

// Edit book form
app.get("/books/:id/edit", async (req, res) => {
    const book = await pool.query("SELECT * FROM books WHERE id = $1", [req.params.id]);
    res.render("edit", { book: book.rows[0] });
});

// Update book
app.put("/books/:id", async (req, res) => {
    const { title, author, rating, notes, date_read, cover_id } = req.body;
    await pool.query(
        "UPDATE books SET title=$1, author=$2, rating=$3, notes=$4, date_read=$5, cover_id=$6 WHERE id=$7",
        [title, author, rating, notes, date_read, cover_id, req.params.id]
    );
    res.redirect("/");
});

// Delete book
app.delete("/books/:id", async (req, res) => {
    await pool.query("DELETE FROM books WHERE id = $1", [req.params.id]);
    res.redirect("/");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
