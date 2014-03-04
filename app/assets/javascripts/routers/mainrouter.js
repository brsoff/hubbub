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
    this.searchFormView = new SearchFormView();
    this.postFormView = new PostFormView();
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

    //get the current user's watchlist
    this.currentuserwatchlists.fetch({
      success: function () {

        $("#posts, #watchlists_holder, form_container, #search_form").empty();

        //get the current user's posts and put them into #posts element
        Hubbub.currentuserposts.fetch();
        $('#posts').html(Hubbub.currentuserpostsView.render().el);
        // inititate the form where current user can create posts and put it in #form_container element
        $('#form_container').html(Hubbub.postFormView.render().el)
        // inititate the seaerch form where current user can search for other users and put it in #form_container element
        $('#search_form').html(Hubbub.searchFormView.render().el)

        Hubbub.currentuserpostsView.delegateEvents();
        Hubbub.postFormView.delegateEvents();
        Hubbub.searchFormView.delegateEvents();
        $("#trash").hide();

      }
    });
    
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
    $("#watchlists_holder, #form_container, #posts").empty();
    var $watchlists = $("<div>").attr("id", "watchlists")
    $("#watchlists_holder").append($watchlists);
    $('#watchlists').html(this.currentuserwatchlistsView.render().el);
    $("#watchlists_holder").prepend("<h1>Watchlist</h1>")
    Hubbub.currentuserwatchlistsView.delegateEvents();
    // $('#form_container').html("");
    // $('#posts').html("");
    $("#trash").show(300);
  },

  posts: function(){
    //similar to watchlist, this first thing will render the current user if someone refreshes the posts link, otherwise only the posts will show up and no user data
    var currentuser_view = this.currentuserview;
    this.currentuser.fetch({
      success: function (model) {
        $('#current_user_container').html(currentuser_view.render().el);
      }
    });

    $('#search_form, #form_container, #watchlists_holder').empty();
    $('#search_form').html(Hubbub.searchFormView.render().el);
    $('#form_container').html(Hubbub.postFormView.render().el);
    this.currentuserposts.fetch();
    $('#posts').html(this.currentuserpostsView.render().el);
    Hubbub.currentuserpostsView.delegateEvents();
    Hubbub.searchFormView.delegateEvents();
    Hubbub.postFormView.delegateEvents();
    $("#trash").hide();
  },

  show: function (username) {
    //instantiate current user
    this.currentuser.fetch();
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

        $('#current_user_container').html(Hubbub.userview.render().el);

        Hubbub.currentuserwatchlists.fetch({

          success: function () {

            Hubbub.userposts.fetch({
             data: $.param({
                id: Hubbub.user.attributes.user_id
              })
            });
          }
        })

        Hubbub.userwatchlists.fetch({
          success: function () {
            Hubbub.userwatchlistsView = new UserWatchlistsView({collection: Hubbub.userwatchlists})
          }
        });

        $('#posts, #form_container, #search_form, #watchlists_holder').empty();
        $('#posts').html(Hubbub.userpostsView.render().el);
        $('#search_form').html(Hubbub.searchFormView.render().el);
        Hubbub.userpostsView.delegateEvents();
        Hubbub.searchFormView.delegateEvents();
        $("#trash").hide();

        //remove the post form, shouldnt be able to post from another user's page
      }
    })
  }


});