const pgp = require('pg-promise')();
require('dotenv').config();

const db = pgp(process.env.POSTGRES_URL);

db.connect()
   .then(obj => {
       obj.done(); // libera a conexão
       console.log("Conectado ao banco de dados!");
   })
   .catch(error => {
       console.log("Erro ao conectar ao banco de dados:", error.message || error);
   });