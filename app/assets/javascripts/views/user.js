UserView = Backbone.View.extend({

  initialize: function() {
    this.listenTo(this.model, 'change', this.render)
    this.template = _.template($('#userview').html());
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  events: {
    "click .unfollow": "unfollow",
    "click .follow": "follow"
  },

  follow: function(e){
    e.preventDefault();
    var current_user_id = Hubbub.currentuser.attributes.user_id
    var follow_id = $('.user-info').attr("data-id");
    var params = {
      current_user_id: current_user_id,
      follow_id : follow_id
    }

    $.ajax({
      url: "/follow",
      method: "post",
      data: params,
      dataType: "json",
      success: function(data){
        // Hubbub.show(Hubbub.user.attributes.username)
        $.ajax({
          url: "/userdata",
          data: {username: Hubbub.user.attributes.username},
          type: "get",
          dataType: "json",
          success: function (data) {
            Hubbub.currentuser.fetch({
              success: function () {
                Hubbub.currentuserposts.fetch({
                  success: function () {
                  Hubbub.user = new User (data)
                  Hubbub.userview = new UserView({model: Hubbub.user});
                  $("#current_user_container").empty();
                  $("#current_user_container").html(Hubbub.userview.render().el)
                  Hubbub.userview.delegateEvents();
                  }
                })
              }
            });
          } 
        })
      }
    })
  },

  unfollow: function(e) {
    console.log("unfollow clicked")
    e.preventDefault();
    var current_user_id = Hubbub.currentuser.attributes.user_id;
    var unfollow_id = $('.user-info').attr("data-id");

    var params = {
      current_user_id: current_user_id,
      unfollow_id : unfollow_id
    }

    $.ajax({
      url: "/unfollow",
      method: "post",
      data: params,
      dataType: "json",
      success: function(data){
        console.log("this is the unfollow data")
        console.log(data)
       $.ajax({
          url: "/userdata",
          data: {username: Hubbub.user.attributes.username},
          type: "get",
          dataType: "json",
          success: function (data) {
            console.log("Did we get here?")
            console.log(data)
            Hubbub.currentuser.fetch({
              success: function () {
                console.log('fetching')
                console.log(Hubbub.currentuserposts)
                Hubbub.currentuserposts.fetch();
                Hubbub.user = new User (data)
                Hubbub.userview = new UserView({model: Hubbub.user});
                $("#current_user_container").empty();
                $("#current_user_container").html(Hubbub.userview.render().el)
                Hubbub.userview.delegateEvents();
                  
                
              }
            })
          } 
        })       
      }
    })
    
  }


})