if rating
  json.rating do
    json.(rating, :id, :emotion)

    name = case rating[:emotion]
    when 2
      'happy'
    when 1
      'neutral'
    when 0
      'sad'
    end

    json.name name

    json.answers do
      json.array! rating.answers do |answer|
        json.(answer, :note, :option_id)
      end
    end
  end
else
  json.rating nil
end