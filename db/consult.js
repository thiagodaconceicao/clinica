const pgp = require('pg-promise')();
require('dotenv').config();

const db = pgp(process.env.POSTGRES_URL);

async function inserirConsulta(consulta) {

    try {
        const query = `
            INSERT INTO atendimentos (data_atendimento)
            VALUES ($1)
            RETURNING id;
        `;
        const result = await db.one(query, [consulta]);
        console.log(`Consulta inserida com sucesso, ID: ${result.id}`);
        return result.id;
    }
    catch (error) {
        console.error('Erro ao inserir consulta:', error);
        throw error;
    }



}


module.exports = {
    inserirConsulta
};