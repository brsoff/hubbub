require 'spec_helper'

describe "#self.format_url" do 
  before do
    @url1 = "http://www.portillos.com"
    @url2 = "portillos.com"
    @url3 = ""
    @url4 = "www.portillos.com"
    @url5 = nil
  end

  it "should format urls properly" do 
    Post.format_url(@url1).should == "http://www.portillos.com"
    Post.format_url(@url2).should == "http://portillos.com"
    Post.format_url(@url3).should == ""
    Post.format_url(@url4).should == "http://www.portillos.com"
    Post.format_url(@url5).should == nil
  end
end

describe "#self.add_posts" do 
  before do 
    @current_user = FactoryGirl.create(:user)
    @params = { 
      id: 1,
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
  end 

  it "should add post to the database" do
    Post.last.should == @post
  end
end

describe "#self.get_posts" do 
  before do 
    Post.delete_all
    @current_user = FactoryGirl.create(:user)
    @fake_user = User.create(id: 2, name: "Brendan", username: "brsoff", email: "bsoff@gmail.com", password: "password123", password_confirmation: "password123")
    @fake_user2 = User.create(id: 3, name: "Eric", username: "estreske", email: "es@gmail.com", password: "password123", password_confirmation: "password123")
    @follow1 = Follow.create(followed_id: @fake_user.id, follower_id: @current_user.id)
    @follow2 = Follow.create(id: 2, followed_id: @fake_user2.id, follower_id: @current_user.id)
    @params = {
      message: "Great sandwiches!",
      user_id: @fake_user.id,
      item_url: "http://www.portillos.com",
      item_category: "Restaurant",
      item_name: "Portillos",
      item_image_url: nil,
      user_name: "Bob Bobertson", 
      username: "bbob"
    }
    @post = Post.add_post(@params, @fake_user)

    sleep 2

    @params2 = {
      message: "Delicious!",
      user_id: @fake_user2.id,
      item_url: "http://steak.com",
      item_category: "Food",
      item_name: "Steak",
      item_image_url: "",
      user_name: "Eric",
      username: "estreske"
    }
    @post2 = Post.add_post(@params2, @fake_user2)
    @posts = Post.get_posts(@current_user) 
  end

  it "should return all user's posts and followed user's posts" do 
    @posts.should == [@post, @post2]
  end

  it "should order posts by created_at time" do 
    Post.order_posts(@posts).should == [@post2, @post]
  end
end


describe "#self.get_watched" do 
  before do 
    @current_user = FactoryGirl.create(:user)
    @fake_user = User.create(id: 2, name: "Brendan", username: "brsoff", email: "bsoff@gmail.com", password: "password123", password_confirmation: "password123")
    @params = {
      message: "Great sandwiches!",
      user_id: @fake_user.id,
      item_url: "http://www.portillos.com",
      item_category: "Restaurant",
      item_name: "Portillos",
      item_image_url: nil,
      user_name: "Bob Bobertson", 
      username: "bbob"
    }
    @post = Post.add_post(@params, @fake_user)

    @watchlist = Watchlist.create(post_id: @post.id, user_id: @current_user.id)
  end

  it "should return a list of watchlisted items" do 
    Post.get_watched(@current_user).should == [@watchlist]
  end
end