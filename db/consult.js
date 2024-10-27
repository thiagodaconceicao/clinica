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


async function inserirAtendimento(nomeDentista) {
    try {
        const query = `
            INSERT INTO atendimentos (nome_dentista_selecionado, data_atendimento, criado_em, atualizado_em)
            VALUES ($1, NOW(), NOW(), NOW())
            RETURNING id;
        `;
        const result = await db.one(query, [nomeDentista]);
        console.log(`Atendimento inserido com sucesso, ID: ${result.id}`);
        return result.id;
    } catch (error) {
        console.error('Erro ao inserir atendimento:', error);
        throw error;
    }
}

module.exports = {
    inserirConsulta,
    inserirAtendimento
};