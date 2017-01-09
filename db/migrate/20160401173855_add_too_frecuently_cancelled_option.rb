class AddTooFrecuentlyCancelledOption < ActiveRecord::Migration[5.0]
  def change
    Option.find_or_create_by(name: 'Too frequently canceled or moved') do |opt|
      opt.note = false
    end
  end
end
