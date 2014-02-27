class PostsController < ApplicationController

  def index
    if current_user && current_user.followed_users.length > 0
      @posts = Post.get_posts(current_user)
    else
      @posts = ["You are not following anybody."]
    end
    respond_to do |format|
      format.json {render json: @posts}
      format.html
    end
  end

  def create
    @post = Post.create(post_params)
    render json: @post
  end

  def destroy

  end


  private

  def post_params
    params.require(:post).permit(:message, :user_id)
  end

end
