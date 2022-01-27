const express = require('express');
const cors = require('cors');
const productos = require('./routes/productos');
const db = require('./db/dataBase');
const app = express()
const port = process.env.PORT || 3030;

(async() => {
    try {
        await db.authenticate();
        await db.sync();
        console.log("Conectado correctamente");
    } catch (error) {
        throw new Error(error)
    }
})();


app.use(express.json());
app.use(cors());

app.use('/productos', productos)


app.listen(port, () => {
    console.log('Servidor en el puerto 3030')
})