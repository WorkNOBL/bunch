class CreateRatings < ActiveRecord::Migration[5.0]
  def change
    create_table :ratings do |t|
      t.belongs_to :user, null: false
      t.integer :event_id, default: 0, null: false
      t.timestamps
    end
  end
end
