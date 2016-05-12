var InstagramEntry = Backbone.Model.extend({

  defaults: {
    hashtag: '',
    date: '',
    contentURL: '',
    permalink: ''
  },

  urlRoot: '/api/collections',

  initialize: function() {},

});
