class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable

  validates :username, presence: true

  has_many :posts
  has_many :watchlists
  has_many :followers, through: :follows, source: :followed
  has_many :followed, through: :follows, source: :follower
end
