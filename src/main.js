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

webserver.get('/cadastro-do-cliente', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/html/area-do-cliente.html'));
})

webserver.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/html/login.html'));
})

webserver.post('/cadastro-endpoint', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const userId = await inserirUsuario(email, password);
        console.log(`Usuário inserido com sucesso! ID: ${userId}`);
        
        res.redirect('/login');
    } catch (error) {
        console.error('Erro ao inserir usuário:', error);
        res.status(500).send('Erro ao processar o cadastro.');
    }

})

webserver.post('/login-endpoint', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const usuarioValido = await verificarUsuario(email, password);
        
        if (usuarioValido) {
            res.redirect('/boas-vindas');
        } else {
            res.status(401).send('E-mail ou senha incorretos.');
        }
    } catch (error) {
        console.error('Erro ao verificar login:', error);
        res.status(500).send('Erro no servidor.');
    }
});


webserver.listen(port, () => {
    console.log('Server is running on port 5050');

})