class PagesController < ApplicationController
  def index
    message = {}

    if flash[:error]
      message[:error] = true
      message[:text] = flash[:error]

    elsif flash[:notice]
      message[:text] = flash[:notice]
    end

    @flash = message
  end

  def google_callback
    @data = request.env['omniauth.auth']
    domain = @data.extra.raw_info.hd

    if domain
      domain = Domain.find_or_create_by(name: domain)
      user = User.save_from_auth(@data)
      organization = domain.organizations.find_or_create_by(user: user)

      if organization
        flash[:notice] = "Successfully connected to your google account at @#{domain.name}"
        sign_in_and_redirect user, event: :authentication
      else
        session['devise.google_data'] = request.env['omniauth.auth']
      end
    else
      # it appears you don't belong to the organization.
      flash[:error] = "It appears you don't belong to the google organization."
      redirect_to action: 'index'
    end
  end

end
