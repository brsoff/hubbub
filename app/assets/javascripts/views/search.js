SearchView = Backbone.View.extend({

  initialize: function () {
    this.template = _.template($("#search_view").html());
    // this.render()
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  }


})