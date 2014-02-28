PostsCollection = Backbone.Collection.extend({

  url: '/users/search',

  model: User,

  initialize: function(){
    this.on('remove', this.hideModel, this);
  },

  hideModel: function(model){
    model.trigger('hide');
  },
  // Not working  
  // focusOnpost: function(id) {
  //   var modelsToRemove = this.filter(function(post){
  //     return post.id != id;
  //   });

  //   this.remove(modelsToRemove);
  // }



});