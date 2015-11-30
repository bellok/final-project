/*Meteor.startup(function(){
  Router.addRoute('/home', 'homeTemplate');
  Router.addRoute('/user/:username', 'profileTemplate');
  Router.addRoute('/contact', 'contactTemplate');

  Router.run();
});*/

Lists = new Meteor.Collection('lists');
ScholarInterns = new Meteor.Collection('scholarinterns');



if (Meteor.isClient) {
    Accounts.ui.config({
        passwordSignupFields: 'USERNAME_ONLY'
    });

    Template.addScholarInterns.events({
        'submit form': function(event){
            event.preventDefault();
            var ScholarInternName = $('[id=ScholarInternName]').val();
            var ScholarInternType = $('[id=ScholarInternType]').val();
            var ScholarInternDeadline = $('[id=ScholarInternDeadline]').val();
            var ScholarInternPriority = $('[name=ScholarInternPriority]:checked').val();
            ScholarInterns.insert({
                name: ScholarInternName,
                type: ScholarInternType,
                deadline: ScholarInternDeadline,
                priority: ScholarInternPriority
            }, function(error, results) {
                // Do nothing
            });
            console.log(ScholarInternName);
            console.log(ScholarInternType);
            console.log(ScholarInternDeadline);
            console.log(ScholarInternPriority);
            document.getElementById("addSI").reset();
            $('#myModal').modal('hide');
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

    Template.scholarInterns.helpers({
        'scholarIntern': function(){
            return ScholarInterns.find({}, {sort: {name: 1}});
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}

