CurrentUserView = Backbone.View.extend({

  initialize: function() {
   this.listenTo(this.model, 'change', this.render);
   this.template = _.template($('#currentuserview').html());
    },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }


})