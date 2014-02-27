class Post < ActiveRecord::Base
  belongs_to :user
  has_one :item

  def self.get_posts(current_user)
    user = User.find(current_user.id)
    followed_users = user.followed_users
    @posts = Array.new
    followed_users.each do |user|
      user.posts.each do |post|
        @posts << post
      end
    end
    return @posts
  end

end
