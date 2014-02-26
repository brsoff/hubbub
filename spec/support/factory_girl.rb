FactoryGirl.define do 
  factory :user do 
    id 1
    username "test_person"
    name "Bob Bobertson"
    email "bobertson87@gmail.com"
    password "password123"
    password_confirmation "password123"
  end
end