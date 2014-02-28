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
    this.currentuser = new CurrentUser();
    this.posts = new PostsCollection();
    this.watchlists = new WatchlistsCollection();
    this.postsView = new PostsView({collection: this.posts});
    this.watchlistsView = new WatchlistsView({collection: this.watchlists})
    this.currentuserview = new CurrentUserView({model: this.currentuser});
    // console.log("HEY THIS IS THE CURRENTUSER VIEW")
    // console.log(this.currentuserview)
  },
// THIS FETCHES POST AND WATCHLIST FOR THE INDEX VIEW, WHICH IS DEFAULT
  index: function(){
    var currentuser_view = this.currentuserview;
    this.currentuser.fetch({
      success: function (model) {
        console.log(model)
        $('#current_user_container').html(currentuser_view.render().el);
      }
    });
    this.posts.fetch();
    this.watchlists.fetch();
    console.log(this.currentuser)
    $('#posts').html(this.postsView.render().el);
    $('#watchlists').html(this.watchlistsView.render().el);

    // console.log(this.currentuserview.render().$el)
    
    var postForm = new FormView();
      this.searchview = new SearchView();
     $('#search_form').html(this.searchview.render().el)
    
  },
 // THIS LETS PEOPLE USE THE BACK BUTTON
  start: function(){
    Backbone.history.start();
  },

  watchlist: function(){
    this.watchlists.fetch();
    $('#watchlists').html(this.watchlistsView.render().el);
    $('#posts').empty();

  },

  posts: function(){
    this.posts.fetch();
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