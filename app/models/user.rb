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

  mount_uploader :avatar_url, AvatarUploader

  def self.get_user_info(user)
    @user_data = {}
    @user_data["user_id"] = user.id
    @user_data["name"] = user.name
    @user_data["username"] = user.username
    @user_data["avatar_url"] = user.avatar_url
    @user_data["followers"] = user.followers.count
    @user_data["followed_users"] = user.followed_users.count
    @user_data["posts"] = user.posts.count
    @user_data["followed_ids"] = []
    user.followed_users.each do |user|
      @user_data["followed_ids"] << user.id
    end

    return @user_data
  end


  def self.get_all_users(users)
    @users_data = []
    users.each do |user|
      @users_data << User.get_user_info(user)
    end
    return @users_data
  end

  def self.search(search)
    search_condition = "%" + search + "%"
    User.find(:all, :conditions => ['lower(name) LIKE ? OR lower(username) LIKE ?', search_condition.downcase, search_condition.downcase])
  end


end
