var TitleView = Backbone.View.extend({

  id: 'title',
  
  template: _.template('<h1>Instagram Collection</h1><ul class="nav"><li><a href="/#collections" class="view-collections">View your collections</a></li><li><a href="/#app" class="create-collections">Create collections</a></li></ul>'),

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template);
    return this;
  }

});
