class UsersController < ApplicationController

before_filter :authenticate_user!

  def index
    @user = current_user
    user_data = User.get_user_info(@user)
    render json: user_data
  end

end