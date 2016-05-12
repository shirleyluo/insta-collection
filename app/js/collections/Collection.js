var Collection = Backbone.Collection.extend({

  model: SavedSearch,

  url: '/api/collections',

  getCollections: function(collection) {
    $.getJSON("/api/collections/" + window.localStorage.insta + "", function(data) {
      // console.log('data', data)
        for (var i = 0; i < data.length; i++) {
          collection.add({
            hashtag: data[i].hashtag,
            dateStart: data[i].dateStart,
            dateEnd: data[i].dateEnd
          });
        }

    });
  },

  // getEntries: function(collection, collectionid) {
  //   $.getJSON("/api/collections/" + window.localStorage.insta + "/" + collectionid + "", function(data) {
  //       console.log('resp', data);
  //   });

  // }
});
