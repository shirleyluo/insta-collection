var Instagram = Backbone.Collection.extend({

  model: InstagramEntry,

  url: '/api/collections',

  currentCollectionId: {},

  addInstagramEntry: function(hashtag, dateStart, dateEnd) {
    // Assign arguments to variables accessible to other methods
    this.dateStart = this.convertToTimestamp(dateStart) || 0;
    this.dateEnd = this.convertToTimestamp(dateEnd) || new Date().getTime() / 1000;

    this.hashtag = hashtag;

    var collectionid;

    // TODO: separate out for modularity
    $.ajax({
      type: "POST",
      url: "/api/collections",
      contentType: "application/json",
      data: JSON.stringify({
        hashtag: this.hashtag,
        dateStart: this.dateStart,
        dateEnd: this.dateEnd,
        user: window.localStorage.insta
      }),
      success: function(resp) {
        // Save server-side collection id
        collectionid = resp.id;
        this.currentCollectionId = collectionid;
      }
    });

    // TODO: refactor 
    $.getJSON(
      // Use getJSON & add empty callback at end of URL to prevent cross-domain issues
      'https://api.instagram.com/v1/tags/' + hashtag + '/media/recent?access_token=1108563539.1677ed0.0db9ad2f43424f9ebe9333ce54946ab6&callback=?',
      function(data) {
        // Always save next page for pagination
        this.nextPage = data.pagination.next_url;

        for (var i = 0; i < data.data.length; i++) {
          // Check if hashtag is not in caption - find in comments
          if (data.data[i].caption.text.indexOf('#' + hashtag) === -1) {
            for (var j = 0; j < data.data[i].comments.data.length; j++) {
              if (data.data[i].comments.data[j].text.indexOf('#' + hashtag !== -1) && data.data[i].comments.data[j].from.username === data.data[i].user.username) {
                this.date = data.data[i].comments.data[j].created_time;
              }
            }
          } else {
            this.date = data.data[i].created_time;
          }
         
          // Find content within date range
          if (this.date >= this.dateStart && this.date <= this.dateEnd) {
            if (data.data[i].type === 'video') {
              this.saveEntry(collectionid, hashtag, data.data[i].user.username, this.date, data.data[i].videos.standard_resolution.url, data.data[i].link);
              this.add({
                hashtag: hashtag,
                username: data.data[i].user.username,
                date: this.date,
                contentURL: data.data[i].videos.standard_resolution.url,
                permalink: data.data[i].link
              });
            } else {
              this.saveEntry(collectionid, hashtag, data.data[i].user.username, this.date, data.data[i].images.standard_resolution.url, data.data[i].link);
              this.add({
                hashtag: hashtag,
                username: data.data[i].user.username,
                date: this.date,
                contentURL: data.data[i].images.standard_resolution.url,
                permalink: data.data[i].link
              });
            }
          } else {
            // Super inefficient, but should work
            while (this.date > this.dateStart) {
              this.loadMore();
            }
          }
        }
      }.bind(this)
    );
  },

  loadMore: function() {
    $.getJSON(this.nextPage + '&callback=?', function(data) {
      // TODO: separate duplicate code w/ addInstagramEntry for modularity
      this.nextPage = data.pagination.next_url;
      for (var i = 0; i < data.data.length; i++) {
        if (data.data[i].created_time >= this.dateStart && data.data[i].created_time <= this.dateEnd) {
          if (data.data[i].type === 'video') {
            this.saveEntry(this.currentCollectionId, this.hashtag, data.data[i].user.username, this.date, data.data[i].videos.standard_resolution.url, data.data[i].link);
            this.add({
              hashtag: this.hashtag,
              username: data.data[i].user.username,
              date: data.data[i].created_time,
              contentURL: data.data[i].videos.standard_resolution.url,
              permalink: data.data[i].link
            });
          } else {
            this.saveEntry(this.currentCollectionId, this.hashtag, data.data[i].user.username, this.date, data.data[i].images.standard_resolution.url, data.data[i].link);
            this.add({
              hashtag: this.hashtag,
              username: data.data[i].user.username,
              date: data.data[i].created_time,
              contentURL: data.data[i].images.standard_resolution.url,
              permalink: data.data[i].link
            });
          }
        }
      }
    }.bind(this));
  },

  // Convert user-selected dates to timestamp
  convertToTimestamp: function(date) {
    var arr = date.toString().split('-');
    return new Date(arr[0], arr[1] - 1, arr[2]).getTime() / 1000;
  },

  saveEntry: function(collectionid, hashtag, username, date, contentURL, permalink) {
    $.ajax({
      type: "POST",
      url: "/api/collections/" + collectionid + "",
      contentType: "application/json",
      data: JSON.stringify({
        hashtag: hashtag,
        username: username,
        date: date,
        contentURL: contentURL,
        permalink: permalink,
        user: window.localStorage.insta
      }),
      success: function(resp) {
        // console.log(resp)
      }
    });
  },

});
