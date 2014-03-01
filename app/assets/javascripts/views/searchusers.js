SearchUsersView = Backbone.View.extend({

  initialize: function(){
    this.collection.on('add', this.addAll, this);
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
    // this.$el.empty();
    var searchUserView = new SearchUserView({model: searchItem});
    console.log(this.$el);
    this.$el.prepend(searchUserView.render().$el)
  
  }
});