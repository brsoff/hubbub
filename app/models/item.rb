class Item < ActiveRecord::Base
  belongs_to :post
  belongs_to :itemtype
end
