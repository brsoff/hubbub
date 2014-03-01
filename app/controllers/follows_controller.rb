class FollowsController < ApplicationController

  def follow
    current_user = params[:current_user_id].to_i
    followed_user = params[:follow_id].to_i

   @follow = Follow.create(follower_id: current_user, followed_id: followed_user)
    render json: @follow
  end

  def unfollow
    current_user = params[:current_user_id].to_i
    followed_user = params[:unfollow_id].to_i
    @user = User.find(followed_user)

    if current_user != followed_user
      @unfollow = Follow.where(follower_id: current_user, followed_id: followed_user)
      @unfollow[0].destroy
      render json: @user
    else
      puts "uhhh"
    end
  end

end