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

    //Meteor.methods({
    //   addEntry: function(event) {
    //       var currentUser = Meteor.userId();
    //       ScholarInterns.insert({
    //           name: $('[id=ScholarInternName]'),
    //           type: $('[id=ScholarInternDeadline]'),
    //           deadline: $('[id=ScholarInternDescription]'),
    //           description: $('[id=ScholarInternWebsite]'),
    //           website: $('[id=ScholarInternWebsite]'),
    //           priority: $('[name=ScholarInternPriority]:checked'),
    //           createdBy: currentUser
    //       }, function(error, results) {
    //           // Do nothing
    //       });
    //   },
    //   editEntry: function (entryID) {
    //       event.preventDefault();
    //       var editedProperties = {
    //           name: $(event.target).find('[id=ScholarInternNameEdit]'),
    //           type: $(event.target).find('[id=ScholarInternTypeEdit]'),
    //           deadline: $(event.target).find('[id=ScholarInternDeadlineEdit]'),
    //           description: $(event.target).find('[id=ScholarInternDescriptionEdit]'),
    //           website: $(event.target).find('[id=ScholarInternWebsiteEdit]'),
    //           priority: $(event.target).find('[name=ScholarInternPriorityEdit]:checked')
    //       }
    //       var currentID = entryID._id;
    //       ScholarInterns.update(currentID, {$set: editedProperties}, function(error) {
    //           if (error) {
    //               // display the error to the user
    //               alert(error.reason);
    //           } else {
    //
    //           }
    //       });
    //       Router.go('/entries/' + currentID);
    //   },
    //   deleteEntry: function (entryID) {
    //       var entry = entryID._id;
    //       if (event.target.className == "name") {
    //           Router.go('/entries/' + entry);
    //       }
    //       if (event.target.className == "glyphicon glyphicon-remove" || event.target.className == 'btn btn-default btn-sm deleteEntry') {
    //           ScholarInterns.remove(entry);
    //       }
    //   }
    //});

    Template.addScholarInterns.events({
        'submit form': function (event) {
            event.preventDefault();
            var ScholarInternName = $('[id=ScholarInternName]').val();
            var ScholarInternType = $('[id=ScholarInternType]').val();
            var ScholarInternDeadline = $('[id=ScholarInternDeadline]').val();
            var ScholarInternDescription = $('[id=ScholarInternDescription]').val();
            var ScholarInternWebsite = $('[id=ScholarInternWebsite]').val();
            var ScholarInternPriority = $('[name=ScholarInternPriority]:checked').val();
            var currentUser = Meteor.userId();
            ScholarInterns.insert({
                name: ScholarInternName,
                type: ScholarInternType,
                deadline: ScholarInternDeadline,
                description: ScholarInternDescription,
                website: ScholarInternWebsite,
                priority: ScholarInternPriority,
                createdBy: currentUser
            }, function (error, results) {
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

    Template.editScholarInterns.events({
        'submit form': function (event) {
            event.preventDefault();
            var editedProperties = {
                name: $(event.target).find('[id=ScholarInternNameEdit]').val(),
                type: $(event.target).find('[id=ScholarInternTypeEdit]').val(),
                deadline: $(event.target).find('[id=ScholarInternDeadlineEdit]').val(),
                description: $(event.target).find('[id=ScholarInternDescriptionEdit]').val(),
                website: $(event.target).find('[id=ScholarInternWebsiteEdit]').val(),
                priority: $(event.target).find('[name=ScholarInternPriorityEdit]:checked').val()
            }
            var currentID = this._id;
            ScholarInterns.update(currentID, {$set: editedProperties}, function (error) {
                if (error) {
                    // display the error to the user
                    alert(error.reason);
                } else {

                }
            });
            Router.go('/entries/' + currentID);
        }
    });

    Template.scholarInterns.helpers({
        settings: function () {
            return {
                collection: ScholarInterns,
                rowsPerPage: 10,
                showFilter: true,
                showRowCount: true,
                fields: [
                    {key: 'name', label: 'Name'},
                    {key: 'type', label: 'Type'},
                    {key: 'deadline', label: 'Deadline (yyyy-mm-dd)'},
                    {key: 'priority', label: 'Priority'},
                    {
                        key: 'delete',
                        label: 'Delete',
                        fn: function () {
                            return new Spacebars.SafeString("<button class=\"btn btn-default btn-sm deleteEntry\">" +
                                "<span class=\"glyphicon glyphicon-remove\"></span></button>");
                        }
                    }
                ]
            };
        }
    });

    Template.scholarInterns.events({
        'click .reactive-table tbody tr': function (event) {
            event.preventDefault();
            var post = this._id;
            console.log(event);
            if (event.target.className == "name") {
                Router.go('/entries/' + post);
            }
            if (event.target.className == "glyphicon glyphicon-remove" || event.target.className == 'btn btn-default btn-sm deleteEntry') {
                ScholarInterns.remove(this._id);
            }
        }
    });

    Template.emptyList.helpers({
        'scholarCount': function () {
            console.log('The number of entries is ' + ScholarInterns.find().count());
            return ScholarInterns.find().count() == false;
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}

