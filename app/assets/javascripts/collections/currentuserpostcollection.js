CurrentUserPostsCollection = Backbone.Collection.extend({

  url: '/posts',

  model: Post,

  initialize: function(){
    this.on('remove', this);
  },

});