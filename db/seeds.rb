# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


Itemtype.delete_all

Itemtype.create(name: "Book")
Itemtype.create(name: "Movie")
Itemtype.create(name: "TV Show")
Itemtype.create(name: "Product")
Itemtype.create(name: "Restaurant")
Itemtype.create(name: "Link")
Itemtype.create(name: "Article")
