Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'pages#index'

  devise_for :users, path: ''

  devise_scope :user do
    # get 'login', to: 'devise/sessions#new', as: :new_user_session
    get 'logout', to: 'devise/sessions#destroy', as: :destroy_user_session
  end

  get 'auth/google/callback', to: 'pages#google_callback'
  get 'api/user/profile', to: 'users#profile'
  get 'api/events/list', to: 'events#fetch'
  post 'api/rating/create', to: 'ratings#create'

  # Serve websocket cable requests in-process
  # mount ActionCable.server => '/cable'
end
