class EventsController < ApplicationController
  before_action :authenticate_user!

  def fetch
    @events = get_events || []
    @options = Option.all.order(note: :ASC, name: :ASC)
  end

  private

  def get_events
    @api.update_auth current_user
    events = @api.get_events(current_user.domains.first.name)

    if events[:status]
      events[:items] = events[:items].map do |event|
        rating = current_user.ratings.find_by(event_id: event[:id])
        event[:rating] = rating
        event[:all_ratings] = Rating.where(event_id: event[:id])
        event
      end
    end

    @events = events
  end


end
