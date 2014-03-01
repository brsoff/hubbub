class AddUserNameToPostsTable < ActiveRecord::Migration
  def change
    add_column :posts, :user_name, :string
  end
end
