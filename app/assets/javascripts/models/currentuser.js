CurrentUser = Backbone.Model.extend({
 
 //link to fetch currentuser info
 
  url: "/currentuser",

  urlRoot: "/currentuser",

  defaults: {
    username: "",
    followers: "",
    followed_users: "",

  }

})