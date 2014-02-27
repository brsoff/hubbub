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
r = Itemtype.create(name: "Restaurant")
Itemtype.create(name: "Link")
Itemtype.create(name: "Article")

u = User.create(name: "Bob Bobertson", username: "bbob", email: "bobertson87@gmail.com", password: "password123")
u2 = User.create(name: "Kevin Smith", username: "ksmith", email: "ksmith@gmail.com", password: "password123")

i = Item.create(item_type_id: r.id, url: "http://www.portillos.com/", name: "Portillos")

p = Post.create(message: "Great sandwiches!")

i.post_id = p.id
i.save!

p.user_id = u.id
p.save!

f = Follow.create(follower_id: u2.id, followed_id: u.id)
