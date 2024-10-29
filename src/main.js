const express = require('express');
const webserver = express();
const path = require('path');
const port = 5050;
const morgan = require('morgan');

const { inserirUsuario, verificarUsuario } = require('../db/login');
const { inserirConsulta, inserirAtendimento, buscarAtendimentos } = require('../db/consult');

webserver.use(morgan('dev'));
webserver.use(express.urlencoded({ extended: true }));
webserver.use(express.static(path.join(__dirname, 'static')));
webserver.use(express.json());

webserver.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/html/hello.html'));
})

webserver.get('/cadastro-do-cliente', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/html/area-do-cliente.html'));
})

webserver.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/html/login.html'));
})

webserver.get('/inicio', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/html/inicio.html'));
})

webserver.get('/dentista-consulta', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/html/dentista.html'));

})

webserver.get('/get-list', async (req, res) => {
    try {
        const atendimentos = await buscarAtendimentos();
        res.status(200).json(atendimentos);
    } catch (error) {
        console.error('Erro ao buscar atendimentos:', error);
        res.status(500).json({ error: 'Erro ao buscar atendimentos' });
    }
});

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
            res.redirect('/inicio');
        } else {
            res.status(401).send('E-mail ou senha incorretos.');
        }
    } catch (error) {
        console.error('Erro ao verificar login:', error);
        res.status(500).send('Erro no servidor.');
    }
});

webserver.post('/cadastro-teste', async (req, res) => {
    const result = req.body.dateTime; 
    
    console.log(result);

    try {
        await inserirConsulta(result);
        res.json({ success: true, redirectUrl: '/dentista-consulta' });
    } catch (error) {
        console.error('Erro ao inserir consulta:', error);
        res.status(500).json({ success: false, message: 'Erro ao processar a consulta.' });
    }
});

webserver.post('/dentista-selecao', async (req, res) => {
    const { name } = req.body;  // Recebe o nome do dentista do frontend
    if (!name) {
        return res.status(400).json({ error: 'Nome do dentista é obrigatório' });
    }

    try {
        const atendimentoId = await inserirAtendimento(name);
        res.status(200).json({ message: 'Dentista selecionado com sucesso', atendimentoId });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar dentista selecionado' });
    }
});

webserver.delete('/delete-consulta/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await db.none('DELETE FROM atendimentos WHERE id = $1', [id]);
        res.json({ success: true });
    } catch (error) {
        console.error('Erro ao excluir consulta:', error);
        res.status(500).json({ success: false, message: 'Erro ao excluir consulta.' });
    }
});

webserver.put('/edit-consulta/:id', async (req, res) => {
    const id = req.params.id;
    const newDateTime = req.body.dateTime;

    try {
        await db.none('UPDATE atendimentos SET data_atendimento = $1 WHERE id = $2', [newDateTime, id]);
        res.json({ success: true });
    } catch (error) {
        console.error('Erro ao editar consulta:', error);
        res.status(500).json({ success: false, message: 'Erro ao editar consulta.' });
    }
});

webserver.listen(port, () => {
    console.log('Server is running on port 5050');

})