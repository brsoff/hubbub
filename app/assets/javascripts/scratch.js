WatchlistsCollection = Backbone.Collection.extend({

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

WatchlistView = Backbone.View.extend({

  className: 'eachwatchlist col-sm-4 view',

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.template = _.template($('#watchlistview').html());
  },

  events: {
    'click .destroy': 'delete',
    'click .update': 'edit',
  },


  // template: _.template($("#watchlistview").html()),

  render: function (){
    console.log("TEST")
    

    this.$el.html(this.template(this.model.toJSON()));
 

    
    return this;

  },

  delete: function (){
    console.log("I was called!")
    this.model.destroy();
  },

  edit: function (){
    console.log("edit was called!");
    this.$el.addClass('editing');
    this.$form = $('.form');
    console.log(this.$form);
    this.$form.removeClass('hidden')
    // this.model.set({message: input.val()}).save();
  },

});

WatchlistsView = Backbone.View.extend({

  initialize: function(){
    this.collection.on('add', this.addOne, this);
    this.collection.on('reset', this.addAll, this);
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
    var watchlistView = new WatchlistView({model: watchlistItem});
    console.log(this.$el);
    this.$el.append(watchlistView.render().el);
  }

});