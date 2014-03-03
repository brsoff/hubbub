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
    var search_input = $('#search_field').val();

    Hubbub.searchUsersView = new SearchUsersView({collection: Hubbub.searchCollection})
    Hubbub.searchCollection.fetch({
      traditional: true,
      data: {name: search_input}
    })
    $('#id_search').empty();
    $('#id_search').html(Hubbub.searchUsersView.render().el);
    Hubbub.searchUsersView.delegateEvents();
    }

})