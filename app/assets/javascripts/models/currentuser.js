CurrentUser = Backbone.Model.extend({
 
  url: "/currentuser",

  defaults: {
    username: "",
    followers: "",
    followed_users: "",

  }


})