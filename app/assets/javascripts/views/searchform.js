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
    Hubub.searchUsersView = new SearchUsersView({collection: Hubub.searchCollection})
    Hubub.searchCollection.fetch({
      traditional: true,
      data: {name: $('#search_field').val()}
    })
    $('#id_search').html("");
    $('#id_search').html(Hubub.searchUsersView.render().el);
  }


})