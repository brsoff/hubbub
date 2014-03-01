class AddItemImageUrlToPostsTable < ActiveRecord::Migration
  def change
    add_column :posts, :item_image_url, :text
  end
end
