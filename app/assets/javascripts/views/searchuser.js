SearchUserView = Backbone.View.extend({

  className: 'eachpost',

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.template = _.template($('#search_results').html());
  },

  events: {
  
  },


  

  render: function (){
    console.log("SEARCH")
    
    this.$el.html(this.template(this.model.toJSON()));
 
    return this;

  },



})