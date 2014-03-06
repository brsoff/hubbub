UserWatchlistsCollection = Backbone.Collection.extend({

  url: '/watchlists',

  model: Watchlist,

  initialize: function(){
    this.on('remove', this);
  }

});