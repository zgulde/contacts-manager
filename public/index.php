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
    $contact->name   = $newContact['name'];
    $contact->email  = $newContact['email'];
    $contact->number = $newContact['number'];

    $contact->save();

    return $response;
});

$app->get('/contacts', function($request, $response, $args) 
{
    $response->withJson(Contact::all());
    return $response;
});

$app->get('/contacts/{id}', function($request, $response, $args)
{
    $contact = Contact::find($args['id']);
    $response->write($contact->toJson());
    return $response;
});

$app->put('/contacts/{id}', function($request, $response, $args)
{
    $editedContact = $request->getParsedBody();

    $contact = Contact::find($args['id']);

    $contact->name   = $editedContact['name'];
    $contact->email  = $editedContact['email'];
    $contact->number = $editedContact['number'];

    $contact->save();


    return $response;
});

$app->delete('/contacts/{id}', function($request, $response, $args)
{
    Contact::delete($args['id']);

    return $response;
});

$app->run();
