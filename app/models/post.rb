class Post < ActiveRecord::Base
  belongs_to :user
  has_one :item

  def self.get_posts(current_user)
    user = User.find(current_user.id)
    array = user.followed_users
    binding.pry

    array << user
    @posts = Array.new
    array.each do |followed_user|
      followed_user.posts.each do |post|
        @posts << post
      end
    end
    return @posts
  end

  def self.add_post(params, user)
    @post = Post.create(message: params[:message], user_id: user.id)
    @item = Item.create(name: params[:item_name], post_id: @post.id, url: params[:item_url], itemtype_id: params[:item_type])
    return @post
  end


  #  {"message"=>"omg does this work",
  # "item_name"=>"community",
  # "item_url"=>"nbc.com",
  # "item_type"=>"3",
  # "action"=>"create",
  # "controller"=>"posts",
  # "post"=>{"message"=>"omg does this work"}}

end
