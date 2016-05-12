var CollectionView = Backbone.View.extend({

  el: '#app',

  initialize: function() {
    this.title = new TitleView();
    this.listenTo(this.collection, 'add', this.render);
    this.collection.getCollections(this.collection);
    this.render();
  },

  render: function() {

    this.$el.empty();

    this.entries = this.collection.models.map(function(model) {
      return new SavedSearchView({
        model: model
      });
    });

    var $els = this.entries.map(function(entry) {
      return entry.$el;
    });

    this.$el.append(this.title.$el, $els);

    return this;
  }

});
