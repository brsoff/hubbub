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

  events: { 
    "click #item_name": "revealForm",
    "click #post_submit_button":"createPost",
    "click #close-me":"closeForm"
  },

  closeForm: function () {
    $("#post_message, #item_url, #item_itemtype, #item_category, #post_submit_button, #close-me").hide(300);
  },

  revealForm: function () {
    $("#post_message, #item_url, #item_itemtype, #item_category, #post_submit_button, #close-me").show(300);
  },

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
      user_name: Hubbub.currentuser.attributes.name,
      username: Hubbub.currentuser.attributes.username
    })

    Hubbub.currentuserposts.add(newPost).save();
   
  }
});