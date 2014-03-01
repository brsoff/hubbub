Post.delete_all
User.delete_all
Follow.delete_all

bob = User.create(name: "Bob Bobertson", username: "bbob", email: "bobertson87@gmail.com", password: "password123", avatar_url: "http://www.godairyfree.org/wp-content/uploads/2007/06/sodeliciousminis2.jpg")
kevin = User.create(name: "Kevin Smith", username: "ksmith", email: "ksmith@gmail.com", password: "password123", avatar_url: "http://www.stepbystep.com/wp-content/uploads/2013/04/Top-10-Most-Delicious-Sandwiches-in-the-World-6.jpg")
portillos_post = Post.create(message: "Great sandwiches!", item_category: "Restaurant", item_url: "http://www.portillos.com", item_name: "Portillos" )
portillos_post.user_id = bob.id
portillos_post.user_name = bob.name
portillos_post.save!

follow = Follow.create(follower_id: kevin.id, followed_id: bob.id)

watchlist = Watchlist.create(post: portillos_post, user: kevin)