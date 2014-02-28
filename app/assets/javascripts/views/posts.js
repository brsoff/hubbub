PostsView = Backbone.View.extend({

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

  addOne: function(postItem){
    var postView = new PostView({model: postItem});
    console.log(this.$el);
    this.$el.append(postView.render().$el.hide().fadeIn().animate({ marginLeft: "+=200px"}, 1000))
  
  }
});