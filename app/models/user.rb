class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable

  validates :username, presence: true

  has_many :posts
  has_many :watchlists
  has_many :follows, foreign_key: "follower_id", dependent: :destroy
  has_many :followed_users, through: :follows, source: :followed
  has_many :reverse_follows, foreign_key: "followed_id", class_name: "Follow", dependent: :destroy
  has_many :followers, through: :reverse_follows, source: :follower

  def self.get_user_info(current_user)
    @user_data = {}
    @user_data["user_id"] = current_user.id
    @user_data["name"] = current_user.name
    @user_data["username"] = current_user.username
    @user_data["avatar_url"] = current_user.avatar_url
    @user_data["followers"] = current_user.followers.count
    @user_data["followed_users"] = current_user.followed_users.count
    @user_data["posts"] = current_user.posts.count

    return @user_data
  end


end
