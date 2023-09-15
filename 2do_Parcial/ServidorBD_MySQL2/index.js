const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');

const app = express();
const accesLogStream = fs.createWriteStream(path.join(__dirname, 'acces.logs'), { flags: 'a' });

app.use(bodyParser.json());
app.use(morgan('combined', { stream: accesLogStream }));

app.get("/usuarios", async (req, res) => {
    try {
        const conn = await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'usuarios' });
        const [rows, fields] = await conn.query('SELECT * FROM usuarios');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ mensaje: err.sqlMessage });
    }
});

app.get("/usuarios/:id", async (req, res) => {
    try {
        const conn = await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'usuarios' });
        const [rows, fields] = await conn.query('SELECT * FROM usuarios WHERE id =' + req.params.id);
        if (rows.length === 0) {
            res.status(404).json({ mensaje: "Usuario no existente" });
        } else {
            res.json(rows);
        }
    } catch (err) {
        res.status(500).json({ mensaje: err.sqlMessage });
    }
});

app.post("/usuarios", async (req, res) => {
    try {
        const { nombre, contraseña } = req.body;

        const conn = await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'usuarios' });

        const sql = 'INSERT INTO usuarios (nombre, contraseña) VALUES (?, ?)';
        const [result] = await conn.execute(sql, [nombre, contraseña]);

        res.json({ mensaje: 'Usuario agregado correctamente', usuario: { nombre, contraseña } });
    } catch (err) {
        res.status(500).json({ mensaje: err.sqlMessage });
    }
});

app.put("/usuarios/:id", async (req, res) => {
    try {
        const { nombre, contraseña } = req.body;
        const conn = await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'usuarios' });
        const sql = 'UPDATE usuarios SET nombre = ?, contraseña = ? WHERE id = ?';
        const [result] = await conn.execute(sql, [nombre, contraseña, req.params.id]);

        if (result.affectedRows === 0) {
            res.status(404).json({ mensaje: 'Usuario no encontrado' });
        } else {
            res.json({ mensaje: 'Usuario modificado correctamente' });
        }
    } catch (err) {
        res.status(500).json({ mensaje: err.sqlMessage });
    }
});

app.delete("/usuarios/:id", async (req, res) => {
    try {
        const conn = await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'usuarios' });
        const sql = 'DELETE FROM usuarios WHERE id = ?';
        const [result] = await conn.execute(sql, [req.params.id]);

        if (result.affectedRows === 0) {
            res.status(404).json({ mensaje: 'Usuario no encontrado' });
        } else {
            res.json({ mensaje: 'Usuario eliminado correctamente' });
        }
    } catch (err) {
        res.status(500).json({ mensaje: err.sqlMessage });
    }
});

app.listen(8080, () => {
    console.log("El servidor express escuchando en el puerto 8080");
});
