SearchCollection = Backbone.Collection.extend({

  url: '/search',

  model: User,

  initialize: function(){
    this.on('remove', this.hideModel);
  }

});