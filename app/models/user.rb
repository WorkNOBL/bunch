class User < ApplicationRecord
  devise :omniauthable, omniauth_providers: [:google_oauth2]

  has_many :ratings
  has_many :organizations
  has_many :domains, through: :organizations

  def self.save_from_auth(data)
    info = data.info
    credentials = data.credentials
    user = User.find_by(email: info.email)

    if user
      user.access_token = credentials.token
      user.expires_at = credentials.expires_at
      user.save
    else
      user = User.create(
        name: info.name,
        email: info.email,
        image: info.image,
        encrypted_password: Devise.friendly_token[0, 20],
        access_token: credentials.token,
        refresh_token: credentials.refresh_token,
        expires_at: credentials.expires_at
      )
    end

    user
  end

  def update_token
    expiry = Time.at(self.expires_at.to_i)
    if expiry < Time.now
      google = Rails.application.config_for(:google)
      client = OAuth2::Client.new(
        google['client_id'],
        google['client_secret'],
        site: Devise.omniauth_configs[:google].strategy_class.default_options.client_options.site,
        token_url: Devise.omniauth_configs[:google].strategy_class.default_options.client_options.token_url,
        authorize_url: Devise.omniauth_configs[:google].strategy_class.default_options.client_options.authorize_url
      )
      auth_token = OAuth2::AccessToken.new(client, self.access_token, {
        expires_at: expiry,
        refresh_token: self.refresh_token
      }).refresh!

      self.access_token = auth_token.token
      self.expires_at = auth_token.expires_at
      self.save
    end
  end
end
