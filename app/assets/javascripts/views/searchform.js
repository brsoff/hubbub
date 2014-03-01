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
    Hubbub.searchUsersView = new SearchUsersView({collection: Hubbub.searchCollection})
    Hubbub.searchCollection.fetch({
      traditional: true,
      data: {name: $('#search_field').val()}
    })
    $('#id_search').html("");
    $('#id_search').html(Hubbub.searchUsersView.render().el);
  }


})