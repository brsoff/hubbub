class RemoveItemTypeColumnFromPostsTable < ActiveRecord::Migration
  def change
    remove_column :posts, :item_type
  end
end
