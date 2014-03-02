CurrentUserPostsCollection = Backbone.Collection.extend({

  //url to get posts of currentuser

  url: '/posts',

  //model this collection will use
  model: Post,

  initialize: function(){
    this.on('remove', this.hideModel, this);
  },

  hideModel: function(model){
    model.trigger('hide');
  },

  focusOnpost: function(id) {
    var modelsToRemove = this.filter(function(post){
      return post.id != id;
    });

    this.remove(modelsToRemove);
  }

});