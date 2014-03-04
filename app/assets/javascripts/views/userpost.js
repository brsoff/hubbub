UserPostView = Backbone.View.extend({

  className: 'eachpost',

  initialize: function () {
    var self = this;
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.template = _.template($('#userpostview').html());
    this.$el.data(this.model)

    //if the post is the user's or if it has already been watchlisted, do not make draggable

    // var watchlist_ids = [];

    // Hubbub.currentuserwatchlists.models.forEach(function (model) { 
    //   watchlist_ids.push(model.id) 
    // })

    if (this.model.attributes.user_id != Hubbub.currentuser.attributes.user_id) {

      this.$el.attr("draggable", "true")
      this.$el.draggable({
      cursor: "pointer",
        stack: "trash",
        helper: "clone",
        container: "document",
        appendTo: 'body',
        revert: 'invalid',
        opacity: .7
      });
      $("#add_watchlist").droppable({
        accept: ".eachpost",
        hoverClass: "add_watchlist-hover",
        drop: function (event, ui) {
          self.doStopStuff(event, ui)
          console.log("stuff")
        }
      });

    }
  },

  doStopStuff: function (e, draggable) {
  e.preventDefault();
  var object = draggable.draggable.data();

  console.log("stuff happened")

      var new_watchlist = new Watchlist(object);

      var params = { post_id: object.attributes.id }

      draggable.draggable.fadeOut(300);

      $.ajax({
        url: "/watchlists",
        data: params,
        method: "post",
        dataType: "json",
         success: function (data) {
            console.log(data)
            Hubbub.currentuserwatchlists.fetch({
              success: function () {
                $('#posts').empty().html(Hubbub.userpostsView.render().el);
                Hubbub.userpostsView.delegateEvents();
              }
            });


          }
      })

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

  // watch: function (){
  //   Hubbub.userwatchlists.add(this.model).save()
  // }

  watch: function (e){
    e.preventDefault();
    var new_watchlist = new Watchlist(this.model.attributes);
    Hubbub.currentuserwatchlists.add(new_watchlist);
    var params = { post_id: this.model.attributes.id }

    $.ajax({
      url: "/watchlists",
      data: params,
      method: "post",
      dataType: "json",
      success: function (data) {
        console.log(data)
        $('#posts').empty().html(Hubbub.userpostsView.render().el);
        Hubbub.userpostsView.delegateEvents();
      }
    })
  }

});