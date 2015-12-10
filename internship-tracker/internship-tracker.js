ScholarInterns = new Meteor.Collection('scholarinterns');

Meteor.methods({
    addEntry: function(ScholarInternName, ScholarInternType, ScholarInternDeadline,
                       ScholarInternDescription, ScholarInternWebsite, ScholarInternPriority) {
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
    },
    editEntry: function (editedProperties, currentID) {
        ScholarInterns.update(currentID, {$set: editedProperties}, function (error) {
            if (error) {
                // display the error to the user
                alert(error.reason);
            } else {
                // do nothing
            }
        });
    },
    deleteEntry: function (entry) {
        ScholarInterns.remove(entry);
    }
});

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });

    Meteor.publish("ScholarInterns", function () {
        return ScholarInterns.find();
    })
}

if (Meteor.isClient) {
    var Schemas = {};
    Schemas.ScholarIntern = new SimpleSchema({
        name: {
            type: String,
            label: "Title",
            optional: true
        },
        type: {
            type: String,
            label: "Type",
            optional: true
        },
        deadline: {
            type: String,
            label: "Deadline (yyyy-mm-dd)",
            optional: true
        },
        description: {
            type: String,
            label: "Description",
            optional: true
        },
        website: {
            type: String,
            label: "Website",
            optional: true
        },
        priority: {
            type: String,
            label: "Priority",
            optional: true
        },
        createdBy: {
            type: String,
            label: "Created By",
            optional: true
        }
    });
    ScholarInterns.attachSchema(Schemas.ScholarIntern);

    Meteor.subscribe("ScholarInterns");

    Accounts.ui.config({
        passwordSignupFields: 'USERNAME_ONLY'
    });

    Template.addScholarInterns.events({
        'submit form': function (event) {
            event.preventDefault();
            var ScholarInternName = $('[id=ScholarInternName]').val();
            var ScholarInternType = $('[id=ScholarInternType]').val();
            var ScholarInternDeadline = $('[id=ScholarInternDeadline]').val();
            var ScholarInternDescription = $('[id=ScholarInternDescription]').val();
            var ScholarInternWebsite = $('[id=ScholarInternWebsite]').val();
            var ScholarInternPriority = $('[name=ScholarInternPriority]:checked').val();
            Meteor.call("addEntry", ScholarInternName, ScholarInternType, ScholarInternDeadline,
                ScholarInternDescription, ScholarInternWebsite, ScholarInternPriority);
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
            };
            var currentID = this._id;
            Meteor.call("editEntry", editedProperties, currentID);
            Router.go('/entries/' + currentID);
        }
    });

    Template.scholarInterns.helpers({
        settings: function () {
            return {
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
        },
        ScholarInternsSubset: function () {
            return ScholarInterns.find({createdBy: Meteor.userId()});
        }
    });

    Template.scholarInterns.events({
        'click .reactive-table tbody tr': function (event) {
            event.preventDefault();
            var entry = this._id;
            if (event.target.className == "name") {
                Router.go('/entries/' + entry);
            }
            if (event.target.className == "glyphicon glyphicon-remove" || event.target.className == 'btn btn-default btn-sm deleteEntry') {
                Meteor.call("deleteEntry", entry);
            }
        }
    });

    Template.emptyList.helpers({
        'scholarCount': function () {
            return ScholarInterns.find({createdBy: Meteor.userId()}).count() == false;
        }
    });
}

/*
_id: "4daYparHkdmtewJdQ"
createdBy: "XgdgFRRNiuZrgL7Yn"
deadline: "9999-01-02"
description: "testing "
name: "hello"
priority: "High"
type: "Scholarship"
website: "google"
*/