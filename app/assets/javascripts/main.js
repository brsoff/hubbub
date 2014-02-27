
Post = Backbone.Model.extend({


})

PostsListView = Backbone.View.extend({

  initialize: function () {
    this.views = [];
  },

  render: function () {
    var self = this;
    $(".container.main").append(self.$el)
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
    this.$el.html(this.template(this.model.attributes))
  }

})

FormView = Backbone.View.extend({

  initialize: function(){
    var self = this;
    this.render()
  },

  el: function(){
    $formContainer = $('<div id="form_container">')
    return $formContainer;
  },

  render: function (){
    $('.container').append(this.$el);
    var template = Handlebars.compile( $("#post_form_view").html() );
    this.$el.html(template);
  }
})



$(function () {

window.list = new PostsCollection ();
window.postsListView = new PostsListView ({collection: list}); //render posts
window.postsListView.collection.fetch();
window.form_view = new FormView();

})