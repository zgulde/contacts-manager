<?php


require '../vendor/autoload.php';

function dd($var)
{
    var_dump($var);
    die();
}

$app = new \Slim\App();
// hardcoded php for now
$contacts = [
    [
        "name" => "Chairman Meow",
        "number" => "2101231234",
        "email" => "meow@catmail.com"
    ],
    [
        "name" => "Cleocatra",
        "number" => "2101231234",
        "email" => "cleo@catmail.com"
    ],
    [
        "name" => "Catalie Portman",
        "number" => "2101231234",
        "email" => "catly@meowmail.com"
    ],
    [
        "name" => "Margaret Scratcher",
        "number" => "2101231234",
        "email" => "marg@meowmail.com"
    ]
];


$app->get('/', function($request, $response, $args) 
{
    $html = require_once '../views/main.html';
    return $html;
});

$app->post('/contacts', function($request, $response, $args) 
{
    // add contact to db
});

$app->get('/contacts', function($request, $response, $args) 
{
    // return all contacts
    global $contacts;
    return json_encode($contacts);
});

$app->put('/contacts[/{id}]'), function($request, $response, $args)
{
    // update contact
}

$app->delete('/contacts[/{id}]'), function($request, $response, $args)
{
    // delete contact from db
}

$app->run();
