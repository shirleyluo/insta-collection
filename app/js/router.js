var Router = Backbone.Router.extend({

  initialize: function() {},

  routes : {
    "" : "signup",
    "signup": "signup",
    "app" : "app",
    "collections" : "collections"
  },

  signup: function() {
    $('#signup').html('');
    var signupview = new SignUpView({model: new User()});
  },
  
  app: function() {
    $('#app').html('');
    var appview = new AppView({collection: new Instagram()});
  },

  collections: function() {
    $('#app').html('');
    var collectionview = new CollectionView({collection: new Collection()});
  }
});



