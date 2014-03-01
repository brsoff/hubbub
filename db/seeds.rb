Post.delete_all
User.delete_all
Follow.delete_all

bob = User.create(name: "Bob Bobertson", username: "bbob", email: "bobertson87@gmail.com", password: "password123", avatar_url: "http://placebear.com/200/200")
kevin = User.create(name: "Kevin Smith", username: "ksmith", email: "ksmith@gmail.com", password: "password123", avatar_url: "http://placedog.com/200/200")
portillos_post = Post.create(message: "Great sandwiches!", item_category: "Restaurant", item_url: "http://www.portillos.com", item_name: "Portillos" )
portillos_post.user_id = bob.id
portillos_post.save!

follow = Follow.create(follower_id: kevin.id, followed_id: bob.id)
watchlist = Watchlist.create(post: portillos_post, user: kevin)