/* Schema of the MongoDB collection: ScholarInterns */

var Schemas = {};

Schemas.ScholarIntern = new SimpleSchema({
    name: {
        type: String,
        label: "Title"
    },
    type: {
        type: String,
        label: "Type"
    },
    deadline: {
        type: String,
        label: "Deadline (yyyy-mm-dd)"
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
        label: "Priority"
    },
    createdBy: {
        type: String,
        label: "Created By"
    }
});

