require "spec_helper"

describe "Watchlist model" do

  describe "#self.get_watched" do

    before do
      @user = FactoryGirl.create(:user)
      @post = FactoryGirl.create(:post)
      @post_2 = FactoryGirl.create(:post)
      watchlist_item = FactoryGirl.create(:watchlist, user_id: @user.id, post_id: @post.id)
      watchlist_item_2 = FactoryGirl.create(:watchlist, user_id: @user.id, post_id: @post_2.id)
    end

    it "should get all posts the user has in their watchlist" do
      Watchlist.get_watched(@user).should include(@post && @post_2)
    end

  end

end
