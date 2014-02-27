class HomeController < ApplicationController

  before_filter :authenticate_user!, :except => [:index]

  def index
    user = User.find(current_user.id)
    render json: Post.all
  end

end
