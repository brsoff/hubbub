PostView = Backbone.View.extend({

  className: 'eachpost',

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.template = _.template($('#postview').html());
  },

  events: {
    'click .destroy': 'delete',
    // 'click .update': 'edit',
    'click .watch': 'watch'
  },



  render: function (){
    console.log("TEST")
    
    this.$el.html(this.template(this.model.toJSON()));
 
    return this;

  },

  delete: function (){
    console.log("I was called!")
    this.model.destroy();
  },

  // edit: function (){
  //   console.log("edit was called!");
  //   this.$el.addClass('editing');
  //   this.$form = $('.form');
  //   console.log(this.$form);
  //   this.$form.removeClass('hidden')
  //   // this.model.set({message: input.val()}).save();
  // },

  watch: function (){
    Hubbub.watchlists.add(this.model).save()
  }

});