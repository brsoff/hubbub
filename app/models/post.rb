class Post < ActiveRecord::Base
  belongs_to :user
  # has_one :item

  def self.get_posts(current_user)
    user = User.find(current_user.id)
    following = user.followed_users
    begin
      following << user
    rescue
      puts "relationship already exists"
    end
    @posts = Array.new
    following.each do |followed_user|
      followed_user.posts.each do |post|
        @posts << post
      end
    end
    return @posts
  end

  def self.add_post(params, user)
    url = params[:item_url]
    if url.scan(/\Ahttp:\/\//) == "http:\/\/"
      url
    else
      http = "http:\/\/"
      url = url.split("").unshift(http).join("")
    end
    @post = Post.create(message: params[:message], user_id: user.id, item_name: params[:item_name], item_url: url, item_category: params[:item_category], user_name: user.name, username: user.username)
  end


  def self.get_watched(user)
    @posts = Watchlist.where(user: user)
  end
end
