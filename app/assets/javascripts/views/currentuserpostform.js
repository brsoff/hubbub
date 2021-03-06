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
    $("#post_message, #item_url, #item_itemtype, #item_category, #post_submit_button, #item_image_url, #close-me").hide(300).val("");
    $("#item_name").val("");
  },

  revealForm: function () {
    $("#post_message, #item_url, #item_itemtype, #item_category, #post_submit_button, #item_image_url, #close-me").show(300);
  },

  createPost: function (e) {
    console.log("is this running twice?")
     e.preventDefault();
    var $message = $("#post_message").val();
    var $item_name = $("#item_name").val();
    var $item_url = $("#item_url").val();
    var $item_type = $("#item_itemtype").val();
    var $item_category = $('#item_category').val();
    var $item_image_url = $('#item_image_url').val();

    var newPost = new Post({
      message: $message,
      user_id: Hubbub.currentuser.attributes.user_id,
      item_name: $item_name,
      item_url: $item_url,
      item_category: $item_type,
      item_image_url: $item_image_url,
      user_name: Hubbub.currentuser.attributes.name,
      username: Hubbub.currentuser.attributes.username
    })

    Hubbub.currentuserposts.add(newPost).save();

    Hubbub.currentuser.fetch({
      success: function () {
          Hubbub.searchCollection.fetch({
          traditional: true,
          data: {name: $('#search_field').val()}
          })
         }
      })
    Hubbub.currentuserposts.reset();
    Hubbub.currentuserposts.fetch();
    
    this.closeForm();
  }
});