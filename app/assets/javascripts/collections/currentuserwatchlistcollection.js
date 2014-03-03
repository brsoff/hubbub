CurrentUserWatchlistsCollection = Backbone.Collection.extend({

  //url to get watchlist data for current user
  // putting the url in the model was a mistake, at least in this app.
  url: '/watchlists',

  model: Watchlist,

  initialize: function(){
    this.on('remove', this.hideModel, this);
  },

  hideModel: function(model){
    model.trigger('hide');
  },

  focusOnwatchlist: function(id) {
    var modelsToRemove = this.filter(function(watchlist){
      return watchlist.id != id;
    });

    this.remove(modelsToRemove);
  }

});