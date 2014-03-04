require "spec_helper"

describe "User model" do

  describe "#get_user_info" do

    before :each do
      @current_user = FactoryGirl.create(:user)
      @fake_user = User.create(id: 2, name: "Brendan", username: "brsoff", email: "bsoff@gmail.com", password: "password123", password_confirmation: "password123")
      @fake_user2 = User.create(id: 3, name: "Eric", username: "estreske", email: "es@gmail.com", password: "password123", password_confirmation: "password123")
      # avatar = "http://currentuser.com/avatar.png"
      # @current_user.avatar_url = avatar
      # @current_user.save

      @params = {
        message: "Great sandwiches!",
        user_id: @current_user.id,
        item_url: "http://www.portillos.com",
        item_category: "Restaurant",
        item_name: "Portillos",
        item_image_url: nil,
        user_name: "Bob Bobertson",
        username: "bbob"
      }
      @post = Post.add_post(@params, @current_user)

      Follow.create(followed_id: @current_user.id, follower_id: @fake_user.id)
      Follow.create(followed_id: @fake_user2.id, follower_id: @current_user.id)
      @user_data = User.get_user_info(@current_user)
    end

    it "should return correct user id" do
      @user_data["user_id"].should == 1
      @user_data["name"].should == "Bob Bobertson"
      @user_data["username"].should == "test_person"
      @user_data["followers"].should == 1
      @user_data["followed_users"].should == 1
      @user_data["followed_ids"].should == [3]
      @user_data["posts"].should == 1
    end



    describe "User#get_all_users" do
      before do
        users = User.all
        @users_data = User.get_all_users(users)

      end

      it "should be an array" do
        @users_data.should be_instance_of(Array)
      end

      it "should return appropriate attributes" do
        @users_data[0]["user_id"].should == 1
        @users_data[0]["name"].should == "Bob Bobertson"
        @users_data[0]["username"].should == "test_person"
        @users_data[0]["followers"].should == 1
        @users_data[0]["followed_users"].should == 1
        @users_data[0]["followed_ids"].should == [3]
        @users_data[0]["posts"].should == 1
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
