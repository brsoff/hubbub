class HomeController < ApplicationController

  before_filter :authenticate_user!, :except => [:index]

  def index
    if current_user && current_user.followed_users.length > 0
      @posts = User.get_posts(current_user)
    else
      @posts = ["You are not following anybody."]
    end
    respond_to do |format|
      format.json {render json: @posts}
      format.html
    end
  end

end
