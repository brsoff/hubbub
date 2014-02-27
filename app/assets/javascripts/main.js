
Post = Backbone.Model.extend({


})

PostsListView = Backbone.View.extend({

  initialize: function () {
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
    $postsContainer = $('<div id="posts_container">')
    return $postsContainer;
  }


})

PostsCollection = Backbone.Collection.extend({

  initialize:function () {
    this.bind("all", function () {
      postsListView.render();
    })
  },

  url: "/posts",

  model: Post
})

PostView = Backbone.View.extend({

  initialize: function () {
    this.render();
  },

  template: function (attrs) {
    var source = $("#post_view").html();
    var template = Handlebars.compile(source);
    var templateData = template(attrs);
    return templateData;
  },

  render: function () {
    this.$el.html(this.template())
    // this.template().append(templateData);
  }

})





$(function () {

window.list = new PostsCollection ();
window.postsListView = new PostsListView ({collection: list}); //render posts
window.postsListView.collection.fetch();

})