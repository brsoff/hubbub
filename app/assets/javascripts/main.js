
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

  className: 'eachpost col-sm-3 view',

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.template = _.template($('#postview').html());
  },

  events: {
    'click .destroy': 'delete',
    'click .update': 'edit',
    'click .watch': 'watch'
  },


  // template: _.template($("#postview").html()),

  render: function (){
    console.log("TEST")
    

    this.$el.html(this.template(this.model.toJSON()));
 

    
    return this;

  },

  delete: function (){
    console.log("I was called!")
    this.model.destroy();
  },

  edit: function (){
    console.log("edit was called!");
    this.$el.addClass('editing');
    this.$form = $('.form');
    console.log(this.$form);
    this.$form.removeClass('hidden')
    // this.model.set({message: input.val()}).save();
  },

  watch: function (){
    console.log("to do")
    app.watchlists.add(this.model)
  }

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
    this.render();
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
    console.log("is this running twice?")
     e.preventDefault();
    var $message = $("#post_message").val();
    var $item_name = $("#item_name").val();
    var $item_url = $("#item_url").val();
    var $item_type = $("#item_itemtype").val();
    var $item_category = $('#item_category').val();

    var newPost = new Post({
      message: $message,
      item_name: $item_name,
      item_url: $item_url,
      item_category: $item_type
      

    })


   
    app.posts.add(newPost).save();
   
  }
});

WatchlistsCollection = Backbone.Collection.extend({

  url: '/watchlists',

  model: Post,

  initialize: function(){
    this.on('remove', this.hideModel, this);
  },

  hideModel: function(model){
    model.trigger('hide');
  },

  focusOnwatchlist: function(id) {
    var modelsToRemove = this.filter(function(watchlist){
      return watchlist.id != id;
    });

    this.remove(modelsToRemove);
  }



});

WatchlistView = Backbone.View.extend({

  className: 'eachwatchlist col-sm-3 view',

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.template = _.template($('#watchlistview').html());
  },

  events: {
    'click .destroy': 'delete',
    'click .update': 'edit',
  },


  // template: _.template($("#watchlistview").html()),

  render: function (){
    console.log("TEST")
    

    this.$el.html(this.template(this.model.toJSON()));
 

    
    return this;

  },

  delete: function (){
    console.log("I was called!")
    this.model.destroy();
  },

  edit: function (){
    console.log("edit was called!");
    this.$el.addClass('editing');
    this.$form = $('.form');
    console.log(this.$form);
    this.$form.removeClass('hidden')
    // this.model.set({message: input.val()}).save();
  },

});

WatchlistsView = Backbone.View.extend({

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

  addOne: function(watchlistItem){
    var watchlistView = new WatchlistView({model: watchlistItem});
    console.log(this.$el);
    this.$el.append(watchlistView.render().el);
  }

});
 // THE ROUTER IS THE FIRST PLACE THE APP GOES WHEN I STARTS

PostRouter = Backbone.Router.extend({
routes: {
    "": "index"
    // "posts/:id": "show",
    // "posts/:id/edit": "edit",
    // "posts/new" : "newpost"
  },
// THIS INITIALIZES POSTS AND WATCHLIST
  initialize: function(){
    this.posts = new PostsCollection();
    console.log("loading posts")
    console.log(this.posts);
    console.log("loading watchlist")
    this.watchlists = new WatchlistsCollection();
    console.log("Postsview")
    this.postsView = new PostsView({collection: this.posts});
    console.log(this.postsView);
    console.log('WatchlistView');
    this.watchlistsView = new WatchlistsView({collection: this.watchlists})
  
  },
// THIS FETCHES POST AND WATCHLIST FOR THE INDEX VIEW, WHICH IS DEFAULT
  index: function(){
    console.log("fetching posts")
 
    this.posts.fetch();
    console.log('fetching watchlist')
    this.watchlists.fetch();
    console.log('rendering postView to div with id #posts')
    $('#posts').html(this.postsView.render().el);
    console.log('rendering watchlist to div with id #watchlists')
    $('#watchlists').html(this.watchlistsView.render().el);
    var postForm = new FormView();
    
  },
 // I BELIEE THIS LETS PEOPLE USE THE BACKBUTTON
  start: function(){
    Backbone.history.start();
  },

  // show: function(id){
  //   this.posts.focusOnpost(id);
  // },

  // edit: function (id){
  //   var postForm = new formView({model: this.posts.get(id)});
  //   $('#posts').html(postForm.render().el);


  // }


});

$(function(){
  app = new PostRouter;
  app.start();

});


//INTERPOLATE FOR UNDERSCORE TEMPLATE NOW {{=}}
//EVALUATE {{}}
_.templateSettings = {
    interpolate: /\{\{=(.+?)\}\}/g,
    evaluate: /\{\{(.+?)\}\}/g,
};