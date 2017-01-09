class EventMailer < ApplicationMailer

  def rating_sent(data)
    current_user = data[:current_user]
    organizer = data[:organizer]
    attendees = data[:attendees]
    event = data[:event]
    to = []

    to.push(organizer) if organizer && current_user[:email] != organizer

    if attendees
      attendees = attendees.select do |email|
        !User.find_by(email: email) && current_user[:email] != email
      end

      to = to.concat(attendees)
    end

    @title = event[:title] if event
    mail(to: to, subject: 'Bunch – Rate Your Meetings') unless to.empty?
  end
end
