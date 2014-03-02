UserView = Backbone.View.extend({

  initialize: function() {
          _.bindAll(this, 'render');
          if(this.model) {
          this.model.on('change', this.render, this);
          }
         this.template = _.template($('#userview').html());
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }


})