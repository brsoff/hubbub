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
    // $('#watchlists').html(this.currentuserwatchlistsView.render().el);
    
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

        //begin the non-logged-in user stuff
        //set up the user info with info from ajax call
        Hubbub.user = new User(data);
        Hubbub.userview = new UserView({model: Hubbub.user});

        Hubbub.userposts = new UserPostsCollection();
        Hubbub.userpostsView = new UserPostsView({collection: Hubbub.userposts});

        Hubbub.userwatchlists = new UserWatchlistsCollection();
        Hubbub.userwatchlistsView = new UserWatchlistsView({collection: Hubbub.userwatchlists})

        $('#current_user_container').html(Hubbub.userview.render().el);
       
        Hubbub.userposts.fetch({
          data: $.param({
              id: Hubbub.user.attributes.user_id
            })
        });
        Hubbub.userwatchlists.fetch();

        $('#posts').html(Hubbub.userpostsView.render().el);
        // $('#watchlists').html(Hubbub.userwatchlistsView.render().el);
        //remove the post form, shouldnt be able to post from another user's page
        $('#form_container').html("")
      }
    })
  }


});