'use strict';

var app = angular.module('contactsApp', []);

app.controller('ContactsController', ['$http', function($http){

    // takes a number and adds '-' as appropriate for a 10-digit number
    this.formatPhoneNumber = function(number){
        if (typeof number == 'undefined') return;

        // get rid of anything that is not a number
        number = this.getRawNumber(number);

        if(number.length > 6){
            number = number.slice(0,3) + '-' + number.slice(3,6) + '-' + number.slice(6,10);
        }else if (number.length > 3) {
            number = number.slice(0,3) + '-' + number.slice(3)
        }

        return number;
    };

    // takes a string and returns only the digits in the string
    this.getRawNumber = function (string){
        return string.replace(/[^\d]/g, '');
    };

    // pushes the contact object passed to the contacts array and resets the 
    // newContact object in order to clear out the add contact form
    this.addContact = function(contact){
        contact.number = this.getRawNumber(contact.number);
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

    // formats the number property of the contactObject passed
    this.onPhoneInputChange = function(contactObject){
        contactObject.number = this.formatPhoneNumber(contactObject.number);
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
