// SUGGEST WE TRANFSFORM THIS INTO UNDERSCORE TEMPLATE AND REMOVE HANDLEBARS
PostFormView = Backbone.View.extend({

  initialize: function(){
    var self = this;
    this.render();
    this.template = _.template($('#post_form_view').html());
  },

  render: function (){
    this.$el.html(this.template);
    return this
  },

  events: { "click #post_submit_button":"createPost" },

  createPost: function (e) {
    console.log("is this running twice?")
     e.preventDefault();
    var $message = $("#post_message").val();
    var $item_name = $("#item_name").val();
    var $item_url = $("#item_url").val();
    var $item_type = $("#item_itemtype").val();
    var $item_category = $('#item_category').val();

    var newPost = new Post({
      message: $message,
      item_name: $item_name,
      item_url: $item_url,
      item_category: $item_type,
      user_name: Hubbub.currentuser.attributes.name
    })

    Hubbub.currentuserposts.add(newPost).save();
   
  }
});