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
            number = number.slice(0,3) + '-' + number.slice(3);
        }

        return number;
    };

    // takes a string and returns only the digits in the string
    this.getRawNumber = function (string){
        return string.replace(/[^\d]/g, '');
    };

    // pushes the contact object passed to the contacts array and resets the 
    // newContact object in order to clear out the add contact form
    this.addContact = function(newContact){
        var self = this;
        newContact.number = this.getRawNumber(newContact.number);
        $http.post('/contacts', newContact).then(function(){
            self.getContacts();
        });

        this.newContact = {};
    };

    // creates a js confirm dialog to confirm the removal of a contact from the 
    // contacts array
    this.removeContact = function(index){
        if (confirm('Are you sure you want to remove ' + this.contacts[index].name + '?')) {
            this.contacts.splice(index, 1);
        }
    };

    // takes the index of a contact in the contacts array and stores that 
    // contact in the editedContact object
    // stores the index of the contact to edit
    this.populateModal = function(id){
        var self = this;

        $http.get('/contacts/' + id).then(function(response){
            self.editedContact = response.data;
            self.editedContact.number = self.formatPhoneNumber(self.editedContact.number);
            self.getContacts();
        }, function(){
            console.log("Error!");
        });
    };

    // replaces the contact at the index stored by populateModal() with the 
    // contact object passed to it
    // closes the edit contact modal
    this.editContact = function(id){
        var self = this;
        // this.contacts[this.indexOfContactToEdit] = editedContact;
        $http.put('/contacts/' + id, self.editedContact).then(function(response){
            self.getContacts();
        }, function(){
            console.log("Error!");
        });
        $('#edit-contact').modal('toggle');
    };

    // formats the number property of the contactObject passed
    this.onPhoneInputChange = function(contactObject){
        contactObject.number = this.formatPhoneNumber(contactObject.number);
    };

    // requests the contact data from the server and sets the contacts object
    // to the response
    this.getContacts = function(){
        var self = this;
        
        $http.get('/contacts').then(function(response){
            self.contacts = response.data; 
        }, function(){
            console.log("Error!");
        });
    };

    this.contacts = {};
    this.newContact = {};
    this.editedContact = {};
    this.indexOfContactToEdit = -1;

    this.getContacts();

}]);
