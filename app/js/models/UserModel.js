var User = Backbone.Model.extend({

  defaults: {
    username: '',
  },

  urlRoot: '/api/users',

  initialize: function() {},

  saveUser: function(user) {
    $.ajax({
      type: "POST",
      url: "/api/users",
      contentType: "application/json",
      data: JSON.stringify({username: user}),
      success: function(resp) {
        // TODO: Should be in view
        $('#signup').html('');
        router.navigate('/app', {trigger: true});
      }
    });
  }

});
