PostsView = Backbone.View.extend({

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
    var postView = new PostView({model: postItem});
    console.log(this.$el);
    this.$el.prepend(postView.render().$el.hide().fadeIn(500))
  
  }
});