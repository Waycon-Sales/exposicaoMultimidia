const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);

app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get('/fluxo02', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'fluxo02.html'));
})

app.get('/fluxo03', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'fluxo03.html'));
})

app.get('/creditos', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'creditos.html'));
})

server.listen(3001, () => {
    console.log("Servidor rodando na porta", server.address().port);
});


const io = require('socket.io')(server);

const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const port = new SerialPort({ path: 'COM9', baudRate: 9600 })

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))

port.on('open', () => {
    console.log("conexão iniciada");
    parser.on('data', (data) => {
        console.log(data);

        if(data == '01'){
            io.emit('serial:data', {
                value: true
            });
        }else if(data == '02'){
            io.emit('serial:data02', {
                value: true
            });
        }else if(data == '03'){
            io.emit('serial:data03', {
                value: true
            });
        }
        
    });
});
