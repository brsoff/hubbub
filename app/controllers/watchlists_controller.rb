class WatchlistsController < ApplicationController

  def index
    @posts = Watchlist.get_watched(current_user)
    render json: @posts
  end

  def create
    @watchlist = Watchlist.add_post(params, current_user)
    render json: @watchlist
  end

  def destroy
    @watchlist = Watchlist.find(params[:id])
    @watchlist.destroy!

    render json: @watchlist

  end

end
