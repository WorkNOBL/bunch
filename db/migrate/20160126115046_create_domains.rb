class CreateDomains < ActiveRecord::Migration[5.0]
  def change
    create_table :domains do |t|
      t.string :name, null: false
      t.timestamps
    end
  end
end
