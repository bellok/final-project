Router.configure({
    layoutTemplate:'layout'
});

Router.map(function() {
    this.route('home', {path:'/'});
    this.route('about', {path:'/about'});
});

Router.route('/list/:_id', {
    name: 'listPage',
    template: 'listPage',
    data: function(){
        var currentList = this.params._id;
        return Lists.findOne({_id: currentList});
    }
});