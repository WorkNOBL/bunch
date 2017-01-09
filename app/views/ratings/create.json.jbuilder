json.event do
  json.(@event, :id)
  json.emotion @event[:emotion].to_i
end
json.partial! 'shared/rating', rating: @rating
json.partial! 'shared/stats', ratings: @event[:all_ratings]