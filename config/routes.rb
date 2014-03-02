WdiProject3::Application.routes.draw do

  devise_for :users

  resources :posts
  resources :users
  # resources :items
  resources :watchlists

  devise_scope :user do
    get "/sign_out" => "devise/sessions#destroy"
  end

  root to: "home#index"

  get "/currentuser" => "users#current"

  get "/user" => "users#user"

  get '/search' => "users#search"

  post "/follow" => "follows#follow"

  post "/unfollow" => "follows#unfollow"

  get "/userdata" => "users#userdata"

  get "/userposts" => "posts#userposts"
end
