
Post = Backbone.Model.extend({
  defaults: {
    message: "",
    user_id: ""


  }

})

// PostsListView = Backbone.View.extend({

//   initialize: function () {
//     this.views = [];
//   },

//   render: function () {
//     var self = this;
//     $(".container.main").append(self.$el)
//     self.$el.empty();

//     _.each(self.collection.models, function (post) {
//       var post_view = new PostView ({
//         model: post
//       });

//       self.$el.append(post_view.$el)

//       self.views.push(post)
//     })
//   },

//   el: function () {
//     $postsContainer = $('<div id="posts_container">')
//     return $postsContainer;
//   }


// })

PostsCollection = Backbone.Collection.extend({

  url: '/posts',

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

PostView = Backbone.View.extend({

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove)
  },

  events: {
    'click .destroy': 'delete',
    'click .update': 'edit',
  },

  template: function (attrs) {
    console.log("is this working?")
    console.log(attrs)
    var source = $("#post_view").html();
    var template = Handlebars.compile(source);
    var templateData = template(attrs);
    return templateData;
  },

  render: function (){
    this.$el.html(this.template(this.model.toJSON()));
    return this;

  },

  delete: function (){
    console.log("I was called!")
    this.model.destroy();
  },

  edit: function (){
    console.log("edit was called!");
    input = this.$('.edit');
    this.model.set({name: input.val()}).save();
  },

});

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
    this.$el.append(postView.render().el);
  }

});

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
  },

  events: {
    "click #post_submit_button":"createPost"
  },

  createPost: function (e) {
    var message = $("#post_message").val();
    var item_name = $("#item_name").val();
    var item_url = $("#item_url").val();
    var item_type = $("#item_itemtype").val();

    e.preventDefault();

    window.list.create({
      message: message,
      item_name: item_name,
      item_url: item_url,
      item_type: item_type
    })
   
  }
})


PostRouter = Backbone.Router.extend({
routes: {
    "": "index"
    // "posts/:id": "show",
    // "posts/:id/edit": "edit",
    // "posts/new" : "newpost"
  },

  initialize: function(){
    this.posts = new PostsCollection();
    console.log("loading posts")
    console.log(this.posts);
    this.postsView = new PostsView({collection: this.posts});
    console.log("Postsview")
    console.log(this.postsView);
  },

  index: function(){
    console.log("this is the postsview and the cotnacts view el")
    console.log(this.postsView);
    console.log(this.postsView.el);
    this.posts.fetch();
    $('#posts').html(this.postsView.render().el);
    var postForm = new FormView();
    
  },

  start: function(){
    Backbone.history.start();
  },

  show: function(id){
    this.posts.focusOnpost(id);
  },

  edit: function (id){
    var postForm = new formView({model: this.posts.get(id)});
    $('#posts').html(postForm.render().el);


  }
});

$(function(){
  app = new PostRouter;
  app.start();

});