const express = require('express');
const app = express();

app.use(express.json());

// app.get("/alumnos/:carrera", (req, res) => {
//     console.log(req.params);
//     console.log(req.query);
//     console.log(req.body);
//     res.send("Servidor Express contestando peticion GET");
// })

app.get("/alumnos/sistemas", (req, res) => {
    res.json({respuesta : "Servidor Express contestando peticion GET"});
})

app.post("/alumnos", (req, res) => {
    res.send("Servidor Express contestando peticion POST");
})

app.listen(8080, () => {
    console.log("servidor express escuchando en el puerto 8080");
})