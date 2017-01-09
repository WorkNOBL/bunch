class RatingsController < ApplicationController
  before_action :authenticate_user!

  def create
    @rating = current_user.ratings.find_or_create_by(
      event_id: rating_params[:event_id]
    )

    @rating.emotion = rating_params[:emotion]
    @rating.save
    @rating.answers.destroy_all

    if rating_params[:options]
      options = rating_params[:options].to_h.to_a.map do |option|
        {
          rating: @rating,
          option_id: option[1][:id],
          note: option[1][:note]
        }
      end

      @rating.answers.create(options)
    end

    @api.update_auth current_user
    emails = @api.get_event_emails(
      event_id: rating_params[:event_id],
      calendar_id: rating_params[:calendar_id]
    )

    EventMailer.rating_sent(emails).deliver

    @event = {
      id: rating_params[:event_id],
      emotion: rating_params[:emotion],
      all_ratings: Rating.where(event_id: rating_params[:event_id])
    }
  end

  private

  def rating_params
    params.require(:rating).permit(:event_id, :calendar_id, :emotion, :options => [:id, :note])
  end
end
