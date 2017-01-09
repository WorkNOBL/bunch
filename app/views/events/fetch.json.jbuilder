json.status @events[:status]

if @events[:status]
  json.events do
    json.array! @events[:items] do |event|
      json.(event, :title, :id, :date, :recurrence, :organizer, :calendar_id)
      json.partial! 'shared/rating', rating: event[:rating]
      json.partial! 'shared/stats', ratings: event[:all_ratings]
    end
  end
else
  json.message @events[:message]
end

json.options do
  json.array! @options do |option|
    json.(option, :id, :name, :note)
  end
end