class WatchlistsController < ApplicationController

  def index
    @posts = Watchlist.get_watched(current_user)
    render json: @posts
  end




  def create
    @post = Post.add_post(params, current_user)
    render json: @post
  end

  def destroy

  end

end
