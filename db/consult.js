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

async function buscarAtendimentos() {
    try {
        const query = `
            SELECT 
                a.id,
                a.nome_dentista_selecionado,
                a.data_atendimento,
                a.horario_inicio,
                a.horario_fim,
                a.avaliacao,
                a.criado_em,
                a.atualizado_em,
                p.nome AS paciente_nome,
                m.nome AS medico_nome,
                s.nome AS servico_nome,
                c.nome AS clinica_nome
            FROM atendimentos a
            LEFT JOIN pacientes p ON a.id_pacientes = p.id
            LEFT JOIN medicos m ON a.id_medicos = m.id
            LEFT JOIN servicos_medicos s ON a.id_servicos_medicos = s.id
            LEFT JOIN clinica c ON a.id_clinica = c.id
            ORDER BY a.data_atendimento DESC;
        `;
        const result = await db.any(query);
        console.log('Atendimentos buscados com sucesso:', result);
        return result;
    } catch (error) {
        console.error('Erro ao buscar atendimentos:', error);
        throw error;
    }
}

module.exports = {
    inserirConsulta,
    inserirAtendimento,
    buscarAtendimentos
};