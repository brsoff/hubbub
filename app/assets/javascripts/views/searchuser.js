SearchUserView = Backbone.View.extend({

  className: 'search_result',

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.template = _.template($('#search_results').html());
  },

  events: {
    "click .unfollow": "unfollow",
    "click .follow": "follow"
  },

  follow: function(){
    console.log("clicked follow")
    var current_user_id = Hubub.currentuser.attributes.user_id
    console.log(current_user_id)
    var follow_id = $('.user_search_data').attr("data-id");
    console.log(follow_id)

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
        console.log(data)
      }
    })
  },

  unfollow: function() {
    console.log("clicked unfollow")
    var current_user_id = Hubub.currentuser.attributes.user_id
    console.log(current_user_id)
    var unfollow_id = $('.user_search_data').attr("data-id");
    console.log(unfollow_id)

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
        console.log(data)
      }
    })
  },

  render: function (){
    console.log("SEARCH")
    
    this.$el.html(this.template(this.model.toJSON()));
 
    return this;

  },



})