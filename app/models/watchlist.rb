class Watchlist < ActiveRecord::Base
  belongs_to :user
  belongs_to :post

  #get the watchlisted posts for specified user
  def self.get_watched(user)
    watchlist = Watchlist.where(user: user)
    @posts = Array.new
    watchlist.each do |watching|
      @posts << watching.post
    end
    return @posts
  end
end
