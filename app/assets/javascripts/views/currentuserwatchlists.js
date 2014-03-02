CurrentUserWatchlistsView = Backbone.View.extend({

  initialize: function(){
    this.listenTo(this.collection, 'add', this.addOne);
    this.listenTo(this.collection, 'reset', this.addAll);
  },

  render: function (){
    this.addAll()
    return this;
  },

  addAll: function(){
    this.$el.empty();
    this.collection.forEach(this.addOne, this);
  },

  addOne: function(watchlistItem){
    var currentuserwatchlistView = new CurrentUserWatchlistView({model: watchlistItem});
    this.$el.append(currentuserwatchlistView.render().el);
  }

});