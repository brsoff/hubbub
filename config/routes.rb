WdiProject3::Application.routes.draw do

  devise_for :users

  devise_scope :user do
    get "/sign_out" => "devise/sessions#destroy"
  end
  
  root to: "home#index"
end
