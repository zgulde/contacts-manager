<?php

require_once 'contacts_dbc.php';
$dbc = require_once 'dbc.php';

$contacts = 
[
    [ 'name' => 'Cleocatra', 'email' => 'cleo@catmail.com', 'phone' => '1231231234'],
    [ 'name' => 'Chairman Meow', 'email' => 'meow@catmail.com', 'phone' => '1231231254'],
    [ 'name' => 'Margaret Scratcher', 'email' => 'marg@catmail.com', 'phone' => '1231231234'],
    [ 'name' => 'Catalie Portman', 'email' => 'catly@catmail.com', 'phone' => '1231231234']
];


echo 'truncating contacts...' . PHP_EOL;
$dbc->exec('TRUNCATE contacts');

echo 'Inserting values...' . PHP_EOL;

$query  = 'INSERT INTO contacts (name, email, phone) ';
$query .= 'VALUES (:name, :email, :phone)';
$stmt   = $dbc->prepare($query);

foreach ($contacts as $cat) {
    $stmt->bindValue(':name', $cat['name'], PDO::PARAM_STR);
    $stmt->bindValue(':email', $cat['email'], PDO::PARAM_STR);
    $stmt->bindValue(':phone', $cat['phone'], PDO::PARAM_STR);

    $stmt->execute();
}

echo 'Done!' . PHP_EOL;
