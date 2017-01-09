class AddNoteColumn < ActiveRecord::Migration[5.0]
  def change
    change_table :options do |t|
      t.boolean :note, null: false, default: false
    end
  end
end
