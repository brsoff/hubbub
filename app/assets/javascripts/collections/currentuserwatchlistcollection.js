CurrentUserWatchlistsCollection = Backbone.Collection.extend({

  //url to get watchlist data for current user
  // putting the url in the model was a mistake, at least in this app.
  url: '/watchlists',

  model: Watchlist,

  initialize: function(){
    this.on('remove', this.updateWatchlists, this);
    this.on('add', this.updateWatchlists);
  },

  updateWatchlists: function () {
    $("#watchlist-count").html(Hubbub.currentuserwatchlists.length)
  }

});