class PostsController < ApplicationController

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
