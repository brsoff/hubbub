require "spec_helper"

include Warden::Test::Helpers
Warden.test_mode!

describe "Home controller" do

  describe "GET index when logged in" do

    before do
      @user = FactoryGirl.create(:user)
      login_as(@user, :scope => :user)
      visit root_path
    end

    it "should render posts" do
      # page.should have_content("Latest posts")
      puts request

    end

  end

end


Warden.test_reset!
