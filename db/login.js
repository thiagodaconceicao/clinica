const pgp = require('pg-promise')();
require('dotenv').config();

const db = pgp(process.env.POSTGRES_URL);

/*db.connect()
   .then(obj => {
       obj.done(); // libera a conexão
       console.log("Conectado ao banco de dados!");
   })
   .catch(error => {
       console.log("Erro ao conectar ao banco de dados:", error.message || error);
   });*/

async function inserirUsuario(email, password) {
    try {
        const query = `
            INSERT INTO pacientes (email, senha)
            VALUES ($1, $2)
            RETURNING id;
        `;
        const result = await db.one(query, [email, password]);
        console.log(`Usuário inserido com sucesso, ID: ${result.id}`);
        return result.id;
    } catch (error) {
        console.error('Erro ao inserir usuário:', error);
        throw error;
    }
}

async function verificarUsuario(email, password) {
    try {
        const query = `
            SELECT * FROM usuarios
            WHERE email = $1 AND password = $2;
        `;
        const result = await db.oneOrNone(query, [email, password]);

        if (result) {
            console.log('Usuário encontrado:', result);
            return true;
        } else {
            console.log('Usuário ou senha incorretos.');
            return false;
        }
    } catch (error) {
        console.error('Erro ao verificar usuário:', error);
        throw error;
    }
}

module.exports = {
    inserirUsuario,
    verificarUsuario
};