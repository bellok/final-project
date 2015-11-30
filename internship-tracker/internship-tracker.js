/*Meteor.startup(function(){
  Router.addRoute('/home', 'homeTemplate');
  Router.addRoute('/user/:username', 'profileTemplate');
  Router.addRoute('/contact', 'contactTemplate');

  Router.run();
});*/

Lists = new Meteor.Collection('lists');
Scholarships = new Meteor.Collection('scholarships');



if (Meteor.isClient) {
    Accounts.ui.config({
        passwordSignupFields: 'USERNAME_ONLY'
    });

    Template.addScholarship.events({
        'submit form': function(event){ // This still needs to be edited
            event.preventDefault();
            var listName = $('[name=listName]').val();
            Lists.insert({
                name: listName
            }, function(error, results) {
                Router.go('listPage', {_id: results});
            });
            console.log(listName);
        }
    });

    Template.addList.events({
        'submit form': function(event){
            event.preventDefault();
            var listName = $('[name=listName]').val();
            Lists.insert({
                name: listName
            }, function(error, results) {
                Router.go('listPage', {_id: results});
            });
            console.log(listName);
        }
    });

    Template.lists.helpers({
        'list': function(){
            return Lists.find({}, {sort: {name: 1}});
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}

