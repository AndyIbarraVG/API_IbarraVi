const express = require('express');
const app = express();
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const promisePool = require('./connection.js');

const accesLogStream = fs.createWriteStream(path.join(__dirname, 'acces.logs'), { flags: 'a' });

app.use(bodyParser.json());
app.use(morgan('combined', { stream: accesLogStream }));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'usuarios'
  });

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

app.post("/usuarios/new", async (req, res) => {
    const {Id_Usuario,nombre, contraseña } = req.body;
    try {

        const result = await promisePool.query(`INSERT INTO usuarios VALUES ('${Id_Usuario}','${nombre}','${contraseña}  ')`)
        res.json(result[0]).status(200);
    } catch (err) {
        res.status(500).json({ mensaje: err.sqlMessage });
    }
});

app.put("/usuarios/:id", async (req, res) => {
    try {
        const { Pancho, Francisco123 } = req.body;
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

app.delete("/producto/:id", (req, res) => {
    const usuarioId = req.params.id;
    console.log(req.params.id);
    connection.query('DELETE FROM usuarios WHERE Id = ?', [usuarioId], (error, results) => {
        if (error) {
            res.status(500).json({ mensaje: "Error de base de datos" });
        } else {
            if (results.length === 0) {
                res.status(404).json({ mensaje: "No existe el producto" });
            } else {
                res.json({mensaje : "Registro eliminado con exito"});
            }
        }
    });
  });

app.listen(8080, () => {
    console.log("El servidor express escuchando en el puerto 8080");
});
