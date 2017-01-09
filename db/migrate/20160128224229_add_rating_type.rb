class AddRatingType < ActiveRecord::Migration[5.0]
  def change
    change_table :ratings do |t|
      t.integer :emotion, null: false, default: 1
    end
  end
end
