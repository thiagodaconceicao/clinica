const express = require('express');
const webserver = express();
const path = require('path');
const port = 5050;
const morgan = require('morgan');

webserver.use(morgan('dev'));

webserver.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/html/hello.html'));
})

webserver.get('/area-do-cliente', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/html/area-do-cliente.html'));
})

webserver.post('/login-endpoint', (req, res) => {
    res.send('Login realizado com sucesso');
})

webserver.listen(port, () => {
    console.log('Server is running on port 5050');

})