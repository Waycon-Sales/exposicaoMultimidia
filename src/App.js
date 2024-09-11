const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);

app.use(express.static('public'));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

server.listen(3001, () => {
    console.log("Servidor rodando na porta", server.address().port);
});

const io = require('socket.io')(server);

const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const port = new SerialPort({ path: 'COM8', baudRate: 9600 })

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))

port.on('open', () => {
    console.log("conexão iniciada");
    parser.on('data', (data) => {
        console.log(data);
        io.emit('serial:data', {
            value:data.toString()
        });
    });
});
