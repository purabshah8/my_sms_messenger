Rails.application.routes.draw do
  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    resources :messages, only: [:index, :create]
    resources :users, only: [:create]
    post "login", to: "sessions#create"
    delete "logout", to: "sessions#destroy"
  end

  get "*path", to: "application#frontend", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

  root "application#frontend"
end
