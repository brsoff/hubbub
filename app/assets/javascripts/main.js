
Post = Backbone.Model.extend({


})

postsListsView = Backbone.View.extend({

  initialize: function () {
    this.render();
    this.views = [];
  },

  render: function () {
    var self = this;
    $("body").append(self.$el)
    self.$el.empty();

    _.each(self.collection.models, function (post) {
      var post_view = new PostView ({
        model: post
      });

      self.$el.append(post_view.$el)

      self.views.push(post)
    })
  },

  el: function () {
    $container = $("<div>").attr("id", "container")
    return $container;
  }


})

PostsCollection = Backbone.Collection.extend({

  initialize:function () {
    this.bind("all", function () {
      postsListsView.render();
    })
  },

  url: "/posts",

  model: Post
})

PostView = Backbone.View.extend({

  initialize: function () {
    this.render(this.model);
  },

  template: function () {
    return $("#post_view")
  },

  render: function (post) {
    var source = this.template().html();
    var template = Handlebars.compile(source);

    var templateData = template(post);
    this.template().append(templateData);
  }

})





$(function () {

window.list = new PostsCollection ();
window.postsListView = new postsListsView ({collection: list}); //render posts

})