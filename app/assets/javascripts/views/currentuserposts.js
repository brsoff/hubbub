CurrentUserPostsView = Backbone.View.extend({

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

  addOne: function(postItem){
    var currentuserpostView = new CurrentUserPostView({model: postItem});
    this.$el.prepend(currentuserpostView.render().$el.hide().fadeIn(500))
  
  }
});