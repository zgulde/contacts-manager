'use strict';

var app = angular.module('contactsApp', []);

app.controller('ContactsController', ['$http', function($http){

    /**
     * adds dashes to a number string as appropriate for a ten-digit phone
     * number
     * 
     * @param  number : the number, as a string to format
     * @return string the formatted number
     */
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

    /**
     * takes a string and returns only the numbers in the string
     */
    this.getRawNumber = function (string){
        return string.replace(/[^\d]/g, '');
    };

    /**
     * sets the number property of the newContact object to the raw number, then
     * sends a post request to the server with the newContact object
     * 
     * @param newContact : contact object to add to the database
     */
    this.addContact = function(newContact){
        var self = this;
        newContact.number = this.getRawNumber(newContact.number);

        $http.post('/contacts', newContact)
             .then(self.getContacts.bind(self), console.log);

        self.newContact = {};
    };

    /**
     * creates a js confirm dialog to confirm the removal of a contact from the
     * contacts array
     * 
     * @param id : id of the contact to delete
     */
    this.removeContact = function(id){
        var self = this;

        var name = self.contacts.filter(contact => contact.id == id).pop().name;

        if (confirm('Are you sure you want to remove ' + name + '?')) {
            $http.delete('/contacts/' + id)
                 .then(self.getContacts.bind(self), console.log);
        }
    };

    /**
     * searches the contacts array for the contact with an id matching the id 
     * passed, creates a copy of the object and sets this.edited contact to it
     * 
     * @param  id : id of the contact to get
     */
    this.populateModal = function(id){
        var editedContact = this.contacts.filter(contact => contact.id == id).pop();
        editedContact = JSON.parse(JSON.stringify(editedContact));
        editedContact.number = this.formatPhoneNumber(editedContact.number);
        this.editedContact = editedContact;
    };

    /**
     * sends a put request to the server update the contact with the id that is 
     * passed
     * closes the edit contact modal
     * 
     * @param  id : id of the contact to edit
     */
    this.editContact = function(id){
        var self = this;

        $http.put('/contacts/' + id, self.editedContact)
             .then(self.getContacts.bind(self), console.log);

        $('#edit-contact').modal('toggle');
    };

    /**
     * calls formatPhoneNumber on the number of the contactObject passed
     * 
     * @param contactObject : an object representing a contact
     */
    this.onPhoneInputChange = function(contactObject){
        contactObject.number = this.formatPhoneNumber(contactObject.number);
    };

    /**
     * requests the contact data from the server and sets the contacts object
     * to the response
     */
    this.getContacts = function(){
        var self = this;
        
        $http.get('/contacts').then(function(response){
            self.contacts = response.data; 
        }, function(){
            console.log("Error!");
        });
    };

    this.contacts = [];
    this.newContact = {};
    this.editedContact = {};

    this.getContacts();

}]);
