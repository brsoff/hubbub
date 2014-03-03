CurrentUserWatchlistView = Backbone.View.extend({

  className: 'eachwatchlist',

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.template = _.template($('#watchlistview').html());
  },

  events: {
    'click .destroy': 'delete',
    'click .update': 'edit',
  },

  render: function (){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  delete: function (){
    var self = this.model;
    this.$el.fadeOut(300, function () {
        self.destroy();
    })
  },

  // edit: function (){
  //   this.$el.addClass('editing');
  //   this.$form = $('.form');
  //   this.$form.removeClass('hidden')
  //   // this.model.set({message: input.val()}).save();
  // },

});