CREATE TABLE clinica(
id UUID DEFAULT gen_random_uuid() PRIMARY key,
CNPJ VARCHAR(250) NOT NULL UNIQUE,
nome VARCHAR(250) NOT NULL,
endereco VARCHAR(250) NOT NULL,
ano_fundacao INTEGER NOT NULL,
ativo BOOLEAN NOT NULL,
criado_em TIMESTAMP NOT NULL,	
atualizado_em TIMESTAMP	
);

CREATE TABLE pacientes(
id UUID DEFAULT gen_random_uuid() PRIMARY key,
id_clinica UUID references clinica(id),
CPF VARCHAR(11) UNIQUE,
nome VARCHAR(250),
email VARCHAR(250) UNIQUE,
data_nascimento VARCHAR(250),
plano_de_saude BOOLEAN,
ativo BOOLEAN,	
criado_em TIMESTAMP,
atualizado_em TIMESTAMP,
senha VARCHAR(250)

);

CREATE TABLE medicos(
id UUID DEFAULT gen_random_uuid() PRIMARY key,
id_clinica UUID references clinica(id) NOT NULL,
CPF VARCHAR(11) NOT NULL UNIQUE,	
CRO VARCHAR(11) NOT NULL UNIQUE,
nome VARCHAR(250) NOT NULL,
data_nascimento VARCHAR(250) NOT NULL,
area VARCHAR(250) NOT NULL,
ativo BOOLEAN NOT NULL,
criado_em TIMESTAMP NOT NULL,	
atualizado_em TIMESTAMP	
);

CREATE TABLE admins(
id UUID DEFAULT gen_random_uuid() PRIMARY key,
id_clinica UUID references clinica(id) NOT NULL,
nome VARCHAR(250) NOT NULL,
data_nascimento VARCHAR(250) NOT NULL,
CPF VARCHAR(11) NOT NULL UNIQUE,
role VARCHAR(50),
ativo BOOLEAN NOT NULL,
criado_em TIMESTAMP NOT NULL,
atualizado_em TIMESTAMP
);

CREATE TABLE servicos_medicos(
id UUID DEFAULT gen_random_uuid() PRIMARY key,
nome VARCHAR(250) NOT NULL,
descricao VARCHAR(250) NOT NULL,
preco FLOAT NOT NULL,	
id_medicos UUID REFERENCES medicos(id) NOT NULL,
situacao_servicos_medicos VARCHAR(250) NOT NULL,
ativo BOOLEAN NOT NULL,	
criado_em TIMESTAMP NOT NULL,
atualizado_em TIMESTAMP
); 
 
CREATE TABLE pagamento(
id UUID DEFAULT gen_random_uuid() PRIMARY key,
id_servicos_medicos UUID REFERENCES servicos_medicos(id) NOT NULL,
id_pacientes UUID REFERENCES pacientes(id) NOT NULL,
valor_total FLOAT NOT NULL,
forma_de_pagamento VARCHAR(250) NOT NULL,
situacao BOOLEAN NOT NULL,	
criado_em TIMESTAMP NOT NULL,	
atualizado_em TIMESTAMP	
);

CREATE TABLE atendimentos(
id UUID DEFAULT gen_random_uuid() PRIMARY key,
avaliacao VARCHAR(250) NOT NULL,
id_medicos UUID REFERENCES medicos(id) NOT NULL,
id_pacientes UUID REFERENCES pacientes(id) NOT NULL,
id_servicos_medicos UUID  REFERENCES servicos_medicos(id) NOT NULL,
id_pagamentos UUID REFERENCES pagamento(id) NOT NULL,
id_admins UUID  REFERENCES admins(id) NOT NULL,
id_clinica UUID references clinica(id) NOT NULL,
horario_inicio TIME(0) NOT NULL,
horario_fim TIME(0) NOT NULL,
data_atendimento VARCHAR(250) NOT NULL,
ativo BOOLEAN NOT NULL,
criado_em TIMESTAMP NOT NULL,
atualizado_em TIMESTAMP	
);