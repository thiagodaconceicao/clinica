const express = require('express');
const webserver = express();
const path = require('path');
const port = 5050;
const morgan = require('morgan');

const { inserirUsuario, verificarUsuario } = require('../db/login');

webserver.use(morgan('dev'));
webserver.use(express.urlencoded({ extended: true }));

webserver.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/html/hello.html'));
})

webserver.get('/area-do-cliente', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/html/area-do-cliente.html'));
})

webserver.post('/login-endpoint', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const userId = await inserirUsuario(email, password);
        res.send(`Usuário inserido com sucesso! ID: ${userId}`);
    } catch (error) {
        // Caso haja algum erro durante a inserção
        console.error('Erro ao inserir usuário:', error);
        res.status(500).send('Erro ao processar o cadastro.');
    }

})

webserver.listen(port, () => {
    console.log('Server is running on port 5050');

})