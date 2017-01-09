class CreateAnswers < ActiveRecord::Migration[5.0]
  def change
    create_table :answers do |t|
      t.belongs_to :rating, null: false
      t.belongs_to :option, null: false
      t.text :note, null: true
      t.timestamps
    end
  end
end
