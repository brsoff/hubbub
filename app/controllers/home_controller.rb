class HomeController < ApplicationController

  before_filter :authenticate_user!, :except => [:index]

  def index
    @post = Post.new
    @item = Item.new

    @posts = Post.all
    @itemtypes = Itemtype.all
  end

end
