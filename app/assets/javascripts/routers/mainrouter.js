// THE ROUTER IS THE FIRST PLACE THE APP GOES WHEN I STARTS

PostRouter = Backbone.Router.extend({
routes: {
    "": "index",
    "watchlist": "watchlist",
    "posts":"posts",
    "users/:username":"show"
  },
// THIS INITIALIZES POSTS AND WATCHLIST on 
  initialize: function(){
    this.currentuser = new CurrentUser();
    this.currentuserposts = new CurrentUserPostsCollection();
    this.currentuserwatchlists = new CurrentUserWatchlistsCollection();
    this.currentuserpostsView = new CurrentUserPostsView({collection: this.currentuserposts});
    this.currentuserwatchlistsView = new CurrentUserWatchlistsView({collection: this.currentuserwatchlists})
    this.currentuserview = new CurrentUserView({model: this.currentuser});
    this.searchCollection = new SearchCollection();
  },
// THIS FETCHES POST AND WATCHLIST FOR THE INDEX VIEW, WHICH IS DEFAULT
  index: function(){
    var currentuser_view = this.currentuserview;
    this.currentuser.fetch({
      success: function (model) {
        $('#current_user_container').html(currentuser_view.render().el);
      }
    });
    this.currentuserposts.fetch();
    this.currentuserwatchlists.fetch();
    $('#posts').html(this.currentuserpostsView.render().el);
    $('#watchlists').html(this.currentuserwatchlistsView.render().el);
    
    this.postFormView = new PostFormView();
    $('#form_container').html(this.postFormView.render().el)
    this.searchFormView = new SearchFormView();
    $('#search_form').html(this.searchFormView.render().el)
    
  },
 // THIS LETS PEOPLE USE THE BACK BUTTON
  start: function(){
    Backbone.history.start();
  },

  watchlist: function(){
    this.currentuserwatchlists.fetch();
    $('#watchlists').html(this.currentuserwatchlistsView.render().el);
    $('#posts').empty();

  },

  posts: function(){
    this.currentuserposts.fetch();
    $('#posts').html(this.currentuserpostsView.render().el);
    $('#watchlists').empty();
  },

  show: function (username) {
    $.ajax({
      url: "/userdata",
      data: {username: username},
      type: "get",
      dataType: "json",
      success: function (data) {
        console.log(data)

      }
    })
  }


});