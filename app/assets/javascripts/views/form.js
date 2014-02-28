 // NEED TO FIX THIS SO IT DOESNT APPEND MORE THAN ONE FORM
FormView = Backbone.View.extend({


  initialize: function(){
    var self = this;
    this.$el.empty();
    this.render();
  },

  el: function(){
    $formContainer = $('<div id="form_container">')
    return $formContainer;
  },

  render: function (){
    $('#left-sidebar').append(this.$el);
    var template = Handlebars.compile( $("#post_form_view").html() );
    this.$el.html(template);
  },

  events: {
    "click #post_submit_button":"createPost"
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
      item_category: $item_type
      

    })


   
    Hubub.posts.add(newPost).save();
   
  }
});