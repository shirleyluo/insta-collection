var SavedSearch = Backbone.Model.extend({

  defaults: {
    hashtag: '',
    dateStart: '',
    dateEnd: ''
  },

  urlRoot: '/api/collections',

  initialize: function() {},

});
