# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


Itemtype.delete_all
Post.delete_all
Item.delete_all
User.delete_all
Follow.delete_all

Itemtype.create(name: "Book")
Itemtype.create(name: "Movie")
Itemtype.create(name: "TV Show")
Itemtype.create(name: "Product")
restaurant = Itemtype.create(name: "Restaurant")
Itemtype.create(name: "Link")
Itemtype.create(name: "Article")

bob = User.create(name: "Bob Bobertson", username: "bbob", email: "bobertson87@gmail.com", password: "password123")
kevin = User.create(name: "Kevin Smith", username: "ksmith", email: "ksmith@gmail.com", password: "password123")

portillos = Item.create(itemtype_id: restaurant.id, url: "http://www.portillos.com/", name: "Portillos")

portillos_post = Post.create(message: "Great sandwiches!")

portillos.post_id = portillos_post.id
portillos.save!

portillos_post.user_id = bob.id
portillos_post.save!

follow = Follow.create(follower_id: kevin.id, followed_id: bob.id)
