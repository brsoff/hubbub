UserView = Backbone.View.extend({

  initialize: function () {
    this.template = _.template($("userview").html());
  }

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
  }


})