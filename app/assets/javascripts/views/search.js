SearchView = Backbone.View.extend({

  initialize: function () {
    this.template = _.template($("#search_view").html());
    // this.render()
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  events: {
    "click #search_submit": "executeSearch"
  },

  executeSearch: function() {
    console.log("search clicked")
    var params = {
      name: $('#search_field').val()
    }
    $.ajax({
      url: "/users/search",
      method: "post",
      dataType: "json",
      data: params,
      success: function(data){
        console.log(data)
      }

    })
  }


})