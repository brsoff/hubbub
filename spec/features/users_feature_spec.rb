require 'spec_helper'

describe "user registration" do

  before do
    visit root_path
    fill_in "Name", with: "Bob Bobertson"
    fill_in "Username", with: ""
    fill_in "Email", with: "bobertson87@gmail.com"
    fill_in "Password", with: "password123"
    fill_in "Password confirmation", with: "password123"
    find_button("Sign up").click
  end

  it "should not allow a user to leave a blank username" do
    page.current_path.should == "/users"
    page.should have_content("Username can't be blank")
  end
end

describe "user login" do

  describe "enters username/password and submits"
  before do

    @user = FactoryGirl.create(:user)
    visit root_path
    click_on "Sign in"
    fill_in "Email", with: @user.email
    fill_in "Password", with: @user.password
    find_button("Sign in").click
  end

  it "should log them in" do
    page.current_path.should == root_path
    page.should have_content("Sign Out")
  end

end
