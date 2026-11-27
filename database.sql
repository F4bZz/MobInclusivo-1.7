CREATE DATABASE mobi_inclusiva
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE mobi_inclusiva;


CREATE TABLE registros (
    id INT AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(100) NOT NULL,

    categoria ENUM(
        'Ponto de Ônibus',
        'Ônibus (Linha)',
        'Calçada'
    ) NOT NULL,

    relato VARCHAR(500) NOT NULL,

    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    status VARCHAR(30) DEFAULT 'Recebido'
);


CREATE INDEX idx_data_criacao
ON registros(data_criacao);

SELECT
    id,
    nome,
    categoria,
    relato,
    data_criacao,
    status
FROM registros
ORDER BY data_criacao DESC;


INSERT INTO registros (
    nome,
    categoria,
    relato
) VALUES (
    'Terminal Central',
    'Ponto de Ônibus',
    'Falta de piso tátil próximo à plataforma.'
);

SELECT COUNT(*) AS total_registros
FROM registros;
