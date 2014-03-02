CurrentUserWatchlistsCollection = Backbone.Collection.extend({

  //url to get watchlist data for current user
  url: '/watchlists',

  model: Post,

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