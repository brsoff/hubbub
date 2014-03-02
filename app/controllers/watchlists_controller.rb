class WatchlistsController < ApplicationController

  def index
    @posts = Watchlist.get_watched(current_user)
    render json: @posts
  end

  def create
    post_id = params[:post_id].to_i

    @watchlist = Watchlist.create(user_id: current_user.id, post_id: post_id)
    render json: @watchlist
  end

  def destroy
    @watchlist = Watchlist.find(params[:id])
    @watchlist.destroy!

    render json: @watchlist

  end

end
