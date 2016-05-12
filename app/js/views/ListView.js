var ListView = Backbone.View.extend({

  id: 'list',

  initialize: function() {
    this.listenTo(this.collection, 'add', this.render);
  },

  events: {
    "click .load-more": "loadMore"
  },

  loadMore: function(e) {
    this.collection.loadMore();
    // TODO: prevent scroll to top
    e.preventDefault();
  },

  render: function() {

    this.$el.empty();

    this.entries = this.collection.models.map(function(model) {
      return new EntryView({
        model: model
      });
    });

    var $els = this.entries.map(function(entry) {
      return entry.$el;
    });

    this.$el.append($els);
    this.$el.append('<button class="load-more">Load More</button>');

    return this;
  }

});
