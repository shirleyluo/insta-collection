var SignUpView = Backbone.View.extend({

  el: '#signup',

  template: _.template('<form><h2>Sign In or Sign Up</h2><input type="email" class="username" placeholder="Enter your email address"></input><button class="signup">Submit</button></form>'),

  initialize: function() {
    router.navigate('signup');
    this.render();
  },

  events: {
    'click .signup': 'submit',
  },

  submit: function(e) {
    e.preventDefault();
    var username = $('.username').val();
    this.model.saveUser(username);
    // TODO: access username via model
    window.localStorage.insta = username;
  },

  render: function() {
    $('#signup').html(this.template);
    return this;
  }

});


