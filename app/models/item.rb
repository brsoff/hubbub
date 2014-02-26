class Item < ActiveRecord::Base
  belongs_to :post
  has_one :itemtype
end
