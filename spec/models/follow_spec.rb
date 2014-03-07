require "spec_helper"

describe "Follow model" do

  describe "when a user chooses to follow another user" do

    before do
      @user = FactoryGirl.create(:user)
      @user_2 = FactoryGirl.create(:user, email: "example@example3.com")
      @follow = FactoryGirl.create(:follow, followed_id: @user.id, follower_id: @user_2.id)
    end

    it "should be represented as a follow in the database" do
      Follow.last.should == @follow
    end

    it "should be represented with a follow association" do
      @user.followers.should include(@user_2)
    end

    it "should be represented with the opposite association" do
      @user_2.followed_users.should include(@user)
    end

    describe "when the follow is destroyed" do
      before do
        @follow.destroy
      end

      it "the associations above should no longer exist" do
        @user.followers.should_not include(@user_2)
        @user_2.followed_users.should_not include(@user)
      end

    end

  end

end
