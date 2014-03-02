//the router is where everything starts from, like rails routes

PostRouter = Backbone.Router.extend({
routes: {
    "": "index",
    "watchlist": "watchlist",
    "posts":"posts",
    "users/:username":"show"
  },

  initialize: function(){
    //when the app starts or is initiated, it needs a global current user (the user who is logged in). this initiates the current user object, their posts, watchlist, and initializes their views. 
    //also initiates a search collection that will hold all of the things the current user searches for.
    this.currentuser = new CurrentUser();
    this.currentuserposts = new CurrentUserPostsCollection();
    this.currentuserwatchlists = new CurrentUserWatchlistsCollection();
    this.currentuserpostsView = new CurrentUserPostsView({collection: this.currentuserposts});
    this.currentuserwatchlistsView = new CurrentUserWatchlistsView({collection: this.currentuserwatchlists})
    this.currentuserview = new CurrentUserView({model: this.currentuser});
    this.searchCollection = new SearchCollection();
  },

  index: function(){
    //the home page. setting up the view that we will use for the current user
    var currentuser_view = this.currentuserview;
    //get the current user from rails
    this.currentuser.fetch({
      success: function (model) {
        //on success, render the current user view in the #current_user_container element
        $('#current_user_container').html(currentuser_view.render().el);
      }
    });
    //get the current user's posts and put them into #posts element
    this.currentuserposts.fetch();
    $('#posts').html(this.currentuserpostsView.render().el);

    //get the current user's watchlist
    this.currentuserwatchlists.fetch();

    // inititate the form where current user can create posts and put it in #form_container element
    this.postFormView = new PostFormView();
    $('#form_container').html(this.postFormView.render().el)

    // inititate the seaerch form where current user can search for other users and put it in #form_container element
    this.searchFormView = new SearchFormView();
    $('#search_form').html(this.searchFormView.render().el)
    
  },
 // THIS LETS PEOPLE USE THE BACK BUTTON
  start: function(){
    Backbone.history.start();
  },

  watchlist: function(){
    //this tells the watchlist route that we'll be using the current user for the view on render, otherwise only watchlist stuff will show up
    var currentuser_view = this.currentuserview;
    this.currentuser.fetch({
      success: function (model) {
        $('#current_user_container').html(currentuser_view.render().el);
      }
    });

    //get the user's watchlist from rails, render it into #watchlists element
    this.currentuserwatchlists.fetch();
    $('#watchlists').html(this.currentuserwatchlistsView.render().el);

    //empty #posts element
    $('#posts').empty();

  },

  posts: function(){

    //similar to watchlist, this first thing will render the current user if someone refreshes the posts link, otherwise only the posts will show up and no user data
    var currentuser_view = this.currentuserview;
    this.currentuser.fetch({
      success: function (model) {
        $('#current_user_container').html(currentuser_view.render().el);
      }
    });

    this.currentuserposts.fetch();
    $('#posts').html(this.currentuserpostsView.render().el);
    $('#watchlists').empty();
  },

  show: function (username) {
    // to get individual users data we'll need to make an ajax call and pass in the user name. urls by username is probably a bit more exciting than urls by id, so we'll .where the username in the controller to find the right user
    $.ajax({
      url: "/userdata",
      data: {username: username},
      type: "get",
      dataType: "json",
      success: function (data) {
        console.log(data)

        //begin the non-logged-in user stuff
        //set up the user info with info from ajax call. this is pretty much the same process as what's happening with current user above
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

        //remove the post form, shouldnt be able to post from another user's page
        $('#form_container').html("")
      }
    })
  }


});