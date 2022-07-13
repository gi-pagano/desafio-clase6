const express = require('express');
const app = express();
const fs = require('fs');
const port = 8080;

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName;
    }

    async getAll() {
        try {
            let data = await fs.promises.readFile(this.fileName, 'utf-8');
            const object = JSON.parse(data);
            return object;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getOne(){
        try {
            let data = await fs.promises.readFile(this.fileName, 'utf-8');
            const object = JSON.parse(data);
            const random = Math.floor(Math.random() * object.length);
            return object[random];
        } catch (err) {
            throw new Error(err);
        }
    }
}

let contenedor = new Contenedor('./products.txt');

const server = app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`)
})

server.on("error", error => console.log(`Error en servidor: ${error}`))

app.get('/', (req, res) => {
    res.send('<h2>Ver <a href="/productos">todos los productos</a></h2><h2>Ver <a href="/productoRandom">producto random</a></h2>')
})

app.get('/productos', (req, res) => {
    contenedor.getAll().then(data => {
        res.send(JSON.stringify(data));
    }).catch(err => {
        res.send(err);
    })
    
})
app.get('/productoRandom', (req, res) => {
    contenedor.getOne().then(data => {
        res.send(JSON.stringify(data));
    }).catch(err => {
        res.send(err);
    })
})