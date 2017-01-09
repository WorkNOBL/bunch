class CreateOrganizations < ActiveRecord::Migration[5.0]
  def change
    create_table :organizations, id: false do |t|
      t.belongs_to :user, index: true
      t.belongs_to :domain, index: true
    end
  end
end
