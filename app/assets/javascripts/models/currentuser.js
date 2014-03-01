CurrentUser = Backbone.Model.extend({
 
  url: "/currentuser",

  urlRoot: "/currentuser",

  defaults: {
    username: "",
    followers: "",
    followed_users: "",

  }

})