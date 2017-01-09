# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Option.delete_all

options = [
  'Too many people', 'Not the right people', 'No clear process',
  'Too much process', 'No clear next steps', 'Redundant', 'Too long',
  'Unnecessary', 'Starts late', 'Ends late', 'Inconveniently Scheduled',
  'Non-Collaborative', 'Unsure of Purpose', 'Other Comments or Suggestions',
  'Too frequently canceled or moved'
].map do |option|

  obj = {
    name: option
  }

  if option == 'Other Comments or Suggestions'
    obj['note'] = true
  end

  obj
end

Option.create(options)
