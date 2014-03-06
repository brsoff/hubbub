require "spec_helper"

describe "User model" do

  describe "#get_user_info" do

    before :each do
      @current_user = FactoryGirl.create(:user)
      fake_user = FactoryGirl.create(:user, email: "example@example.com")
      @fake_user_2 = FactoryGirl.create(:user, email: "example2@example2.com")
      post = Post.add_post(FactoryGirl.create(:post, user_id: @current_user.id), @current_user)
      FactoryGirl.create(:follow, followed_id: @current_user.id, follower_id: fake_user.id)
      FactoryGirl.create(:follow, followed_id: @fake_user_2.id, follower_id: @current_user.id)

      @user_data = User.get_user_info(@current_user)
    end

    it "should return correct user info" do
      @user_data["user_id"].should == @current_user.id
      @user_data["name"].should == "Bob Bobertson"
      @user_data["username"].should == "test_person"
      @user_data["followers"].should == 1
      @user_data["followed_users"].should == @current_user.followed_users.count
      @user_data["followed_ids"].should == [@fake_user_2.id]
      @user_data["posts"].should == @current_user.posts.count
    end


    describe "User#get_all_users" do
      before do
        @users = User.all
        @users_data = User.get_all_users(@users)
      end

      it "should be an array" do
        @users_data.should be_instance_of(Array)
      end

      it "should return appropriate attributes" do
        @users_data[0]["user_id"].should == @users.first.id
        @users_data[0]["name"].should == @users.first.name
        @users_data[0]["username"].should == @users.first.username
        @users_data[0]["followers"].should == @users.first.followers.count
        @users_data[0]["followed_users"].should == @users.first.followed_users.count
        # @users_data[0]["followed_ids"].should == @users.followed_users
        @users_data[0]["posts"].should == @users.first.posts.count
      end

    end


    describe "User#search" do
      before do
        @search = User.search("bob")
      end

      it "should return an array" do
        @search.should be_instance_of(Array)
      end

      it "should return the user that was searched for" do
        @search[0].name.should == "Bob Bobertson"
      end

    end

  end

end
