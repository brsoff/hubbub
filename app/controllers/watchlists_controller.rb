class WatchlistsController < ApplicationController

  def index
    @posts = Watchlist.get_watched(current_user)
    render json: @posts
  end

  def create
    post_id = params[:post_id].to_i

    @watchlist = Watchlist.find_or_create_by(user_id: current_user.id, post_id: post_id)
    render json: @watchlist
  end

  def destroy
    post_id = params[:id].to_i
    @watchlist = Watchlist.where(post_id: post_id, user_id: current_user.id).first
    @watchlist.destroy
    render json: @watchlist
  end

end
