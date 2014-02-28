class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.text :message
      t.integer :user_id
      t.string :item_url
      t.string :item_category
      t.string :item_type
      t.string :item_name


      t.timestamps
    end
  end
end
