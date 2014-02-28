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
    @post = Post.add_post(params, current_user)
    render json: @post
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy!

    render json: @post

  end

end
