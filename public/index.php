<?php


require_once '../bootstrap.php';

function dd($var)
{
    var_dump($var);
    die();
}

$app = new \Slim\App();

$app->get('/', function($request, $response, $args) 
{
    $html = require_once '../views/main.html';
    $response->write($html);
    return $response;
});

$app->post('/contacts', function($request, $response, $args) 
{
    // add contact to db
    $newContact = $request->getParsedBody();

    $contact = new Contact();
    $contact->name = $newContact['name'];
    $contact->email = $newContact['email'];
    $contact->number = $newContact['number'];

    $contact->save();

    return $response;
});

$app->get('/contacts', function($request, $response, $args) 
{
    // return all contacts
    global $contacts;
    $response->withJson(Contact::all());
    return $response;
});

$app->put('/contacts[/{id}]', function($request, $response, $args)
{
    $response->write('update');
    return $response;
});

$app->delete('/contacts[/{id}]', function($request, $response, $args)
{
    // delete contact from db
});

$app->run();
