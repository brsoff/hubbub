class UsersController < ApplicationController

before_filter :authenticate_user!

  def index
    @users = User.all
    @info = User.get_all_users(@users)
    render json: @info
  end

  def current
    @user = User.get_user_info(current_user)
    render json: @user
  end

  def show
    user = User.find(params[:id])
    @user = User.get_user_info(user)
    render json: @user
  end

  def search
    @users = User.where("name like ?", "%#{params[:name]}%")
    render json: @users
  end

end