import express from "express";
import pg from "pg";
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static("dist"));

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});
db.connect();

async function getNotes() {
    const result = await db.query("SELECT * FROM note ORDER BY id ASC");
    let items = [];
    return items = result.rows;
}

app.get("/api/notes", async (req, res) => {
    try {
        const notes = await getNotes();
        res.send(notes);
    } catch (error) {
        console.log(error);
    }
});

app.get("/api/create", async (req, res) => {
    const { title, content } = req.query;
    try {
        await db.query("INSERT INTO note (title, content) VALUES ($1, $2)", [title, content]);
    } catch (error) {
        console.log(error);
    }
});

app.get("/api/delete", async (req, res) => {
    const { id } = req.query;
    try {
        await db.query("DELETE FROM note WHERE id = $1", [id])
    } catch (error) {
        console.log(error);
    }
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
