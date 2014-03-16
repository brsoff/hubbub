Post.delete_all
User.delete_all
Follow.delete_all

eric = User.create(name: "Eric", username: "eric", email: "eric87@gmail.com", password: "password123", avatar_url: "http://www.godairyfree.org/wp-content/uploads/2007/06/sodeliciousminis2.jpg")
seed_post = Post.create(message: "Great SUSGHJDS!", item_category: "Restaurant", item_url: "http://www.portillos.com", item_name: "Mexican" )
seed_post.user_id = eric.id
seed_post.user_name = eric.name
seed_post.username = eric.username
seed_post.save!


bob = User.create(name: "Bob Bobertson", username: "bbob", email: "bobertson87@gmail.com", password: "password123", avatar_url: "http://www.godairyfree.org/wp-content/uploads/2007/06/sodeliciousminis2.jpg")
kevin = User.create(name: "Kevin Smith", username: "ksmith", email: "ksmith@gmail.com", password: "password123", avatar_url: "http://www.stepbystep.com/wp-content/uploads/2013/04/Top-10-Most-Delicious-Sandwiches-in-the-World-6.jpg")
portillos_post = Post.create(message: "Great sandwiches!", item_category: "Restaurant", item_url: "http://www.portillos.com", item_name: "Portillos" )
portillos_post.user_id = bob.id
portillos_post.user_name = bob.name
portillos_post.username = bob.username
portillos_post.save!

follow = Follow.create(follower_id: kevin.id, followed_id: bob.id)
follow2 = Follow.create(follower_id: kevin.id, followed_id: kevin.id)
follow3 = Follow.create(follower_id: bob.id, followed_id: bob.id)

watchlist = Watchlist.create(post: portillos_post, user: kevin)