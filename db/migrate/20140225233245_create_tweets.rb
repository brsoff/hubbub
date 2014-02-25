class CreateTweets < ActiveRecord::Migration
  def change
    create_table :tweets do |t|
      t.text :message
      t.integer :user_id
      t.integer :item_id

      t.timestamps
    end
  end
end
