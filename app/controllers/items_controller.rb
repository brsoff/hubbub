class ItemsController < ApplicationController

  def create
    @item = Item.create(item_params)
    render json: @item
  end



  private

  def item_params
    params.require(:item).permit(:itemtype_id, :post_id, :url)
  end

end
