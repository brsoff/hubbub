SearchUsersView = Backbone.View.extend({

  initialize: function(){
    this.listenTo(this.collection, 'add', this.addAll);
    this.listenTo(this.collection, 'reset', this.addAll);
  },

  render: function (){
    this.addAll();
    return this;
  },

  addAll: function(){
    this.$el.empty();
    console.log(this)
    this.collection.forEach(this.addOne, this);
  },

  addOne: function(searchItem){
    var searchUserView = new SearchUserView({model: searchItem});
    this.$el.prepend(searchUserView.render().$el)
  
  }
});