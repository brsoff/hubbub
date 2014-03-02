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
    users = User.where("name like ?", "%#{params[:name]}%")
    @users = User.get_all_users(users)
    render json: @users
  end

  def userdata
    username = params[:username]
    user = User.where(username: username).first
    @user = User.get_user_info(user)
    render json: @user
  end

end