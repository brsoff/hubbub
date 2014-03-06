FactoryGirl.define do
  factory :user do
    username "test_person"
    name "Bob Bobertson"
    email "bobertson87@gmail.com"
    password "password123"
    password_confirmation "password123"
  end

  factory :post do
    message "Great sandwiches!"
    item_url "http://www.portillos.com"
    item_category "Restaurant"
    item_name "Portillos"
    item_image_url nil
    user_name "Bob Bobertson"
    username "bbob"
  end

  factory :follow do
    followed_id 1
    follower_id 2
  end

end
