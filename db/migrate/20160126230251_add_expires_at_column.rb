class AddExpiresAtColumn < ActiveRecord::Migration[5.0]
  def change
    change_table :users do |t|
      t.string :expires_at
    end
  end
end
