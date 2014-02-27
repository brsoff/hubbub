class RemoveColumnItemIdFromPostsTable < ActiveRecord::Migration
  def change
    remove_column :posts, :item_id
  end
end
