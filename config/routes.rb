WdiProject3::Application.routes.draw do

  devise_for :users

  resources :posts
  resources :items

  devise_scope :user do
    get "/sign_out" => "devise/sessions#destroy"
  end

  root to: "home#index"
end
