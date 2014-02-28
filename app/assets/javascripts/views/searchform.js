SearchFormView = Backbone.View.extend({

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
    this.model.fetch({
      traditional: true,
      data: {name: $('#search_field').val()}
    })
  }


})