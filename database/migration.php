<?php

require_once 'contacts_dbc.php';
$dbc = require_once 'dbc.php';

$dbc->exec('DROP TABLE IF EXISTS contacts');

$createTableQuery = 'CREATE TABLE contacts(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(165) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
)';

$dbc->exec($createTableQuery);

echo "migration successful!\n";
