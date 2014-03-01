class FollowsController < ApplicationController

  def follow
   @follow = Follow.create(follower_id: params[:current_user_id], :followed_id: params[:follow_id])
    render json: @follow
  end

  def unfollow
    @unfollow = Follow.where(follower_id: params[:current_user_id], :followed_id: params[:unfollow_id])
    @unfollow.destroy
    render json: @unfollow
  end

end