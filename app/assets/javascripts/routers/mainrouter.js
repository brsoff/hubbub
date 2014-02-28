// THE ROUTER IS THE FIRST PLACE THE APP GOES WHEN I STARTS



PostRouter = Backbone.Router.extend({
routes: {
    "": "index",
    "watchlist": "watchlist",
    "posts":"posts"
    // "posts/:id": "show",
    // "posts/:id/edit": "edit",
    // "posts/new" : "newpost"
  },
// THIS INITIALIZES POSTS AND WATCHLIST on 
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
 // THIS LETS PEOPLE USE THE BACK BUTTON
  start: function(){
    Backbone.history.start();
  },

  watchlist: function(){
    this.watchlists.fetch();
    console.log('rendering watchlist to div with id #watchlists')
    $('#watchlists').html(this.watchlistsView.render().el);
    $('#posts').empty();

  },

  posts: function(){
    this.posts.fetch();
    console.log('rendering posts to div with id #posts')
    $('#posts').html(this.postsView.render().el);
    $('#watchlists').empty();
  }

  // show: function(id){
  //   this.posts.focusOnpost(id);
  // },

  // edit: function (id){
  //   var postForm = new formView({model: this.posts.get(id)});
  //   $('#posts').html(postForm.render().el);


  // }


});