define( [
    "app",
    "text!templates/prop-search.html"
], function ( app, tpl ) {

    var PropertySearchView = Backbone.View.extend( {

        template : _.template( tpl ),
        initialize : function () {
            _.bindAll( this );         
        },

        render : function () {    
              var logged_in = app.session.get('logged_in');
              this.$el.html( this.template({ logged_in:logged_in}));
            return this;
        }
    } );
    
    
    

    return PropertySearchView;
} );