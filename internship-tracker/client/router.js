Router.configure({
    layoutTemplate:'layout'
});

Router.map(function() {
    this.route('home', {path:'/'});
    this.route('about', {path:'/about'});
});

Router.route('/entries/:_id', {
    name: 'viewScholarInterns',
    template: 'viewScholarInterns',
    data: function(){
        var currentEntry = this.params._id;
        return ScholarInterns.findOne({_id: currentEntry});
    }
});

Router.route('/entries/:_id/edit', {
    name: 'editScholarInterns',
    template: 'editScholarInterns',
    data: function(){
        var currentEntry = this.params._id;
        return ScholarInterns.findOne({_id: currentEntry});
    }
});