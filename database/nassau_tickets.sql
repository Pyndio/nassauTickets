CREATE DATABASE IF NOT EXISTS nassau_tickets;

USE nassau_tickets;

CREATE TABLE IF NOT EXISTS senhas (
    id INT AUTO_INCREMENT PRIMARY KEY,

    codigo VARCHAR(10) NOT NULL,

    tipo ENUM('SP', 'SE', 'SG') NOT NULL,

    status ENUM(
        'AGUARDANDO',
        'CHAMADA',
        'CHAMADA NOVAMENTE',
        'EM ATENDIMENTO',
        'ATENDIDA',
        'NÃO COMPARECEU'
    ) NOT NULL DEFAULT 'AGUARDANDO',

    numero_chamadas INT NOT NULL DEFAULT 0,

    data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    data_ultima_chamada DATETIME NULL
);