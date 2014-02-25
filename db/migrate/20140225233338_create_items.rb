class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.integer :item_type_id
      t.integer :tweet_id
      t.text :url

      t.timestamps
    end
  end
end
