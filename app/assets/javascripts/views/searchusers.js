SearchUsersView = Backbone.View.extend({

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

  addOne: function(searchItem){
    var searchUserView = new SearchUserView({model: searchItem});
    console.log(this.$el);
    this.$el.prepend(searchView.render().$el.hide().fadeIn(500))
  
  }
});