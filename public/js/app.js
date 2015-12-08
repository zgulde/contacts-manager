'use strict';

var app = angular.module('contactsApp', []);

app.controller('ContactsController', ['$http', function($http){

    // if a number is a 10 digit number in a variety of formats,  this function
    // returns the nuber formatted like so 'xxx-xxx-xxxx'
    // if it is not a 10 digit number it just returns the number
    this.formatPhoneNumber = function(number){
        var validNumber = /[\s\(]?(\d{3})\)?\s*[\s-\.]?\s*(\d{3})\s*[\s-\.]?\s*(\d{4})\s*$/;
        if( !validNumber.test(number) ){
            return number;
        } else {
            var matches = validNumber.exec(number);
            return matches[1] + '-' + matches[2] + '-' + matches[3];
        }
    };

    // pushes the contact object passed to the contacts array and resets the 
    // newContact object in order to clear out the add contact form
    this.addContact = function(contact){
        this.contacts.push(contact);
        this.newContact = {};
    };

    // creates a js confirm dialog to confirm the removal of a contact from the 
    // contacts array
    this.removeContact = function(contact){
        var index = this.contacts.indexOf(contact);
        if (confirm('Are you sure you want to remove ' + contact.name + '?')) {
            this.contacts.splice(index, 1);
        }
    };

    // takes the index of a contact in the contacts array and stores that 
    // contact in the editedContact object
    // stores the index of the contact to edit
    this.populateModal = function(contactIndex){
        this.editedContact = JSON.parse(JSON.stringify(this.contacts[contactIndex]));
        this.indexOfContactToEdit = contactIndex;
    };

    // replaces the contact at the index stored by populateModal() with the 
    // contact object passed to it
    // closes the edit contact modal
    this.editContact = function(editedContact){
        this.contacts[this.indexOfContactToEdit] = editedContact;
        $('#edit-contact').modal('toggle');
    };

    this.contacts = {};
    this.newContact = {};
    this.editedContact = {};
    this.indexOfContactToEdit = -1;

    // grab the contacts array data
    var self = this;
    $http.get('data.json').then(function(response){
        self.contacts = response.data.contacts;  
    }, function(){
        console.log("Error!");
    });

}]);
