CurrentUserView = Backbone.View.extend({

  initialize: function () {
    this.template = _.template($('#currentuserview').html());

  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }


})