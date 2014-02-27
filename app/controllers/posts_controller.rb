class PostsController < ApplicationController

  def index
    if current_user && current_user.followed_users.length > 0
      @posts = Post.get_posts(current_user)
    else
      @posts = ["You are not following anybody."]
    end

    render json: @posts
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