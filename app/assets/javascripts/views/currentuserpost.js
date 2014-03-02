CurrentUserPostView = Backbone.View.extend({

  className: 'eachpost',

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.template = _.template($('#currentuserpostview').html());
  },

  events: {
    'click .destroy': 'delete',
    'click .watch': 'watch'
  },

  render: function (){ 
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  delete: function (){
    this.model.destroy();
  },

  watch: function (e){
    e.preventDefault();
    var new_watchlist = new Watchlist(this.model.attributes);
    Hubbub.currentuserwatchlists.add(new_watchlist);
    var params = {
      post_id: this.model.attributes.id
    }

    $.ajax({
      url: "/watchlists",
      data: params,
      method: "post",
      dataType: "json",
      success: function (data) {
        console.log(data)
      }
    })
  }

});