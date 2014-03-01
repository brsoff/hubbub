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
    var current_user_id = Hubbub.currentuser.attributes.user_id
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

        Hubbub.currentuser.fetch({
          success: function () {
            Hubbub.searchCollection.fetch({
            traditional: true,
            data: {name: $('#search_field').val()}
            })
          }
        })
        Hubbub.posts.reset();
        Hubbub.posts.fetch();
      }
    })
  },

  unfollow: function() {
    var current_user_id = Hubbub.currentuser.attributes.user_id;
    var unfollow_id = $('.user_search_data').attr("data-id");
    var unfollow_button = $('.user_search_data').find('.unfollow');

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
        Hubbub.currentuser.fetch({
          success: function () {
            Hubbub.searchCollection.fetch({
            traditional: true,
            data: {name: $('#search_field').val()
              }
            })
          }
        })
        Hubbub.posts.reset();
        Hubbub.posts.fetch();
      }
    })
    
  },

  render: function (){
    this.$el.html(this.template(this.model.toJSON()));
    return this;

  },



})