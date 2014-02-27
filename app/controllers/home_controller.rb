class HomeController < ApplicationController

  before_filter :authenticate_user!, :except => [:index]

  def index
    @itemtypes = Itemtype.all
  end

end
