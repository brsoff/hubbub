UserWatchlistsView = Backbone.View.extend({

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
    var userwatchlistView = new UserWatchlistView({model: watchlistItem});
    this.$el.append(userwatchlistView.render().el);
  }

});