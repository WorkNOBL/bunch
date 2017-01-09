happy, neutral, sad = [0] * 3
answers = []
notes = []

ratings.each do |rating|
  case rating[:emotion]
  when 2
    happy = happy + 1
  when 1
    neutral = neutral + 1
  when 0
    sad = sad + 1
  end

  rating.answers.each do |answer|
    notes.push(answer[:note]) if answer[:note]
    answers.push(answer)
  end
end

answers = answers.group_by do |answer|
  answer[:option_id]
end.map do |answer|
  {
    id: answer[0],
    size: answer[1].size
  }
end.sort_by do |answer|
  answer[:size]
end.reverse

max_answers = answers.map do |answer|
  answer[:size]
end.max

json.stats do
  json.emotions do
    json.happy happy
    json.neutral neutral
    json.sad sad
    json.all ratings.size
  end

  json.max do
    json.answers max_answers
    json.emotions [happy, neutral, sad].max
  end
  json.answers answers
  json.notes notes
end
