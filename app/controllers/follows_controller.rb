class FollowsController < ApplicationController

  def follow
    current_user = params[:current_user_id]
    followed_user = params[:unfollow_id]

   @follow = Follow.create(follower_id: current_user, :followed_id: followed_user)
    render json: @follow
  end

  def unfollow
    current_user = params[:current_user_id]
    followed_user = params[:unfollow_id]

    if current_user != followed_user
      @unfollow = Follow.where(follower_id: current_user, :followed_id: followed_user)
      @unfollow.destroy
      render json: @unfollow
    else
      puts "uhhh"
    end
  end

end