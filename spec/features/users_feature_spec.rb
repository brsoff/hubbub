require 'spec_helper'

describe "user login" do 

  describe "enters username/password and submits"
    before do 

      @user = FactoryGirl.create(:user)
      visit new_user_session_path
      fill_in "Username", with: @user.username
      fill_in "Password", with: @user.password
      find_button("Sign in").click
    end

    it "should log them in" do 
      page.current_path.should == root_path
      page.should have_content("Welcome")
    end
end