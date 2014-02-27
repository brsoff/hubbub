require "spec_helper"

include Warden::Test::Helpers
Warden.test_mode!

describe "Posts" do

  before do
    @user = FactoryGirl.create(:user)
    login_as(@user, :scope => :user)
    visit root_path
    fill_in("message", with: "test message")
    select("Restaurant", from: "item_id")
    fill_in("URL", with: "http://www.google.com")
    click_button("Post")
  end

  it "should show the post on the screen" do
    page.should have_content("test message")
  end


end

Warden.test_reset!
