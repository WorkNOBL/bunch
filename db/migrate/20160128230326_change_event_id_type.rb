class ChangeEventIdType < ActiveRecord::Migration[5.0]
  def change
    change_column(:ratings, :event_id, 'string', null: false)
  end
end
