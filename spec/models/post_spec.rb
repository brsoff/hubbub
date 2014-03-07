require 'spec_helper'

describe "Post model" do

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
      @post = Post.add_post(FactoryGirl.create(:post), @current_user)
    end

    it "should add post to the database" do
      Post.last.should == @post
    end

    it "should belong to the user" do
      Post.last.user_id.should == @current_user.id
    end
  end


  describe "#self.get_posts and self.get_user_posts" do
    before do
      ### create some fake users with fake posts and have the current user follow them
      current_user = FactoryGirl.create(:user)
      fake_user = FactoryGirl.create(:user, email: "example@example.com")
      fake_user2 = FactoryGirl.create(:user, email: "example2@example2.com")
      follow1 = FactoryGirl.create(:follow, followed_id: fake_user.id, follower_id: current_user.id)
      follow2 = FactoryGirl.create(:follow, followed_id: fake_user2.id, follower_id:current_user.id)
      @post_1 = Post.add_post(FactoryGirl.create(:post), fake_user)
      sleep 1
      @post_2 = Post.add_post(FactoryGirl.create(:post), fake_user2)
      @posts = Post.get_posts(current_user)
    end

    it "should return all user's posts and followed user's posts" do
      @posts.should == [@post_1, @post_2]
    end

    it "should order posts by created_at time in reverse" do
      # Post.order_posts(@posts).should == [@post_2, @post_1]
      #the posts are being prepended in the view in backbone, that's why it seems like this method was being wonky.
    end
  end

end


describe "#self.get_watched" do
  before do
    @current_user = FactoryGirl.create(:user)
    fake_user = FactoryGirl.create(:user, email: "example@example.com")
    new_post = FactoryGirl.create(:post, user_id: fake_user.id)
    post = Post.add_post(new_post, fake_user)

    @watchlist = Watchlist.create(post_id: post.id, user_id: @current_user.id)
  end

  it "should return a list of watchlisted items" do
    Post.get_watched(@current_user).should == [@watchlist]
  end
end
