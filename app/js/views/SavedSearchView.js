var SavedSearchView = Backbone.View.extend({

  className: 'saved-search',

  template: _.template('<div><a href="/#app" data-hash="<%=hashtag%>" data-start="<%=dateStart%>" data-end="<%=dateEnd%>">#<%=hashtag%></a></div>'),

  initialize: function() {
    this.render();
  },

  events: {
    "click a": "openCollection"
  },

  openCollection: function(e) {
    var hashtag = $(e.currentTarget).data("hash");
    var start = new Date($(e.currentTarget).data("start")*1000);
    var end = new Date($(e.currentTarget).data("end")*1000);
  },

  render: function() {

    var entry = this.template({
      hashtag: this.model.get('hashtag'),
      dateStart: this.model.get('dateStart'),
      dateEnd: this.model.get('dateEnd'),
    });

    this.$el.html(entry);

  }

});
